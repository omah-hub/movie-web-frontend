import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signup.css'

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
    const { register, handleSubmit, formState: { errors}, } = useForm()
    // const onSubmit = (data) => console.log(data)
    const navigate = useNavigate()
    const onSubmit = async (data) => {
      try {
        const response = await axios.post('http://localhost:5000/api/register', data, {
          withCredentials: true,
        });
        console.log(response)
        // localStorage.setItem("isAuthenticated", "true");
        setSuccessMessage('Register successful! Redirecting...');
        setErrorMessage('')
        setTimeout(() => {
          navigate('/auth/login')
        }, 2000);
         
      }catch (error) {
        setErrorMessage(error.response?.data?.error || 'Registration Failed!');
        setSuccessMessage(''); // Clear success message
      }
      }

     
  return (
    <div className='register-container'>
        <p className='text'>Register</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{height: '100px'}}>
                <label htmlFor='name'>Name:</label>
                <input id='name' placeholder='Your Name Here' {...register('name', {required: true,  minLength: 3, pattern: /^[A-Za-z]+$/i})}/>
                {errors.name && <p style={{color : 'red',fontStyle: 'italic',marginTop: '-8px', fontSize: '13px', fontWeight: 'bold'}}>Name is required</p>}
            </div>
            <div style={{height: '100px'}}>
                <label htmlFor='email'>Email:</label>
                <input id='email' placeholder='example@yahoo.com' {...register('email', {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} />
                {errors.name && <p style={{color : 'red',fontStyle: 'italic',marginTop: '-8px', fontSize: '13px', fontWeight: 'bold'}}>Email is required</p>}
            </div>
            <div style={{height: '100px'}}>
                <label htmlFor='password'>Password</label>
                <div style={{ position: 'relative'}}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      validate: (value) =>
                        /(?=.*[A-Z])(?=.*\d)/.test(value) || "Must contain one uppercase and one number",
                    })}
                  />
                  <span onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}>
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
                </div>
          {errors.password && <p style={{color : 'red',fontStyle: 'italic',marginTop: '-8px', fontSize: '13px', fontWeight: 'bold'}}>{errors.password.message}</p>}
            </div>
           

            <div className='button'>
            <button type='submit'>Submit</button>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
    </div>
    
  )
}

export default Signup


// const logout = () => {
//   localStorage.removeItem("isAuthenticated");
//   navigate('/auth/login');  // Redirect to login page
// };