import React, {useState} from 'react'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from "react-toastify";


import { useForm } from 'react-hook-form'


function CommentModal({ isModalOpen, selectedMovie, setIsModalVisible, setIsModalOpen, comments, setComments}) {
   const { register, handleSubmit, reset, formState: { errors }, } = useForm()
   const [editingComment, setEditingComment] = useState(null); // Holds the comment being edited
   const [editedContent, setEditedContent] = useState('');       
        
    const closeModal = () => {
      setIsModalOpen(false); // Start sliding down animation
      setTimeout(() => setIsModalVisible(false), 300); // Remove from DOM after animation
    };

    const addComment = async (data) => {
      const userId = localStorage.getItem("userId");
      const name = localStorage.getItem("name");
      try {
        const response = await axios.post("http://localhost:5000/api/addComment", {
          content: data.comment,
          movieId: selectedMovie.id,
          userId,
          name,
        });
    
        if (response.status === 200) {
          toast.success(response.data.message);
          
          // Update the local comments state with the new comment
          const newComment = {
            name,
            content: data.comment,
            user_id: userId, // Ensure the user_id is set
          };
          
    
          // Update the local comments state
          setComments((prevComments) => [newComment, ...prevComments]); // Add the new comment to the beginning of the list
          reset();
        }
      } catch (error) {
        console.error(error);
        toast.error("user has already commented");
      }
    };
    
    const handleEditClick = (comment) => {
      setEditingComment(comment.user_id); // Set the ID of the comment being edited
      setEditedContent(comment.content); // Pre-fill the content in the input field
    };
    const saveEditedComment = async () => {
      const userId = localStorage.getItem('userId'); // Ensure the user ID is available
    
      try {
        const response = await axios.patch('http://localhost:5000/api/updateComment', {
          content: editedContent, // New content for the comment
          movieId: selectedMovie.id, // Movie ID
          userId,
          commentId: editingComment, // Comment ID being edited
        });
    
        if (response.status === 200) {
          toast.success('Comment updated successfully');
          
          // Update the comments locally
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.user_id === editingComment
                ? { ...comment, content: editedContent }
                : comment
            )
          );
    
          // Clear editing state
          setEditingComment(null);
          setEditedContent('');
        }
        reset()
      } catch (error) {
        console.error(error);
        toast.error('Failed to update comment. Please try again.');
      }
    };
        
    const deleteComment = async (comment) => {
      const userId = localStorage.getItem('userId');
    
      try {
        const response = await axios.delete('http://localhost:5000/api/deleteComment', {
          data: { // Explicitly pass the data for a DELETE request
            movieId: selectedMovie.id,
            userId,
            commentId: comment.id, // Pass the comment ID to identify which comment to delete
          },
        });
    
        if (response.status === 200) {
          toast.success('Comment deleted successfully');
    
          // Update the local state to remove the deleted comment
          setComments((prevComments) =>
            prevComments.filter((prevComment) => prevComment.id !== comment.id)
          );
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete comment. Please try again.');
      }
    };
    
  return (
    <div className="commentmodal-overlay" onClick={(e) => {
      if (e.target.classList.contains("commentmodal-overlay")) {
      closeModal();
      }}}>
    <div className={`commentmodal ${isModalOpen ? "open" : "close"}`}>
      <div className="comment-title">
        <h2>Comments</h2>
        <p style={{ cursor: "pointer" }} onClick={closeModal}>
          x
        </p>
      </div>
      <form className="comment-form" onSubmit={handleSubmit(addComment)}>
        <input
          placeholder="Add comment"
          {...register("comment", { required: true })}
        />
        <button type="submit">send</button>
      </form>
      <div>
        {comments ? (
          comments.map((comment, index) => (
            
            <div className="comment-table" key={index}>
              <p style={{ color: "white" }}>{comment.name}:</p>
              {/* <p id="comment-content">{comment.content}</p> */}

              {editingComment === comment.user_id  && comment.user_id == localStorage.getItem("userId") ? (
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
             ) : (
            <p id="comment-content">{comment.content}</p>
            )}
          {editingComment === comment.user_id && comment.user_id == localStorage.getItem("userId") ? (
            <div style={{display: "inline-flex", marginTop: "-4px"}}>
              <button style={{width: "70px"}} onClick={saveEditedComment}>Save</button>
            <button style={{width: "70px"}} onClick={() => setEditingComment(null)}>Cancel</button>

            </div>
          ) : (
          <div style={{display:"flex",alignItems: "flex-end", gap: "2px"}}>
              <CiEdit
              className="edit-icon"
              onClick={() => handleEditClick(comment)}
              style={{ cursor: "pointer" }}
            />
            <MdOutlineDelete onClick={() => deleteComment(comment)}/>
          </div>
          )}
          </div>
          ))
        ) : (
          <div>
            <p style={{ color: "white", backgroundColor: "blue" }}>
              No comments
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
    
  )
}

export default CommentModal