import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';

import './trends.css';

function Trends() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedVideoKey, setSelectedVideoKey] = useState(null);
    const [page, setPage] = useState(1); // Page state for pagination

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // Set loading true on page change
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/top_rated?api_key=5e76b51b90290cffa75dede9e7533d60&page=${page}`
                );
                setTrendingMovies(response.data.results);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to fetch');
                setError('Failed to fetch');
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);

    const handleMovieClick = async (movieId) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=5e76b51b90290cffa75dede9e7533d60`
            );
            const videos = response.data.results;
            if (videos.length > 0) {
                const trailer = videos.find((video) => video.type === 'Trailer') || videos[0];
                setSelectedVideoKey(trailer.key);
            } else {
                toast.error('No video available');
            }
        } catch (err) {
            console.error('Error fetching video:', err);
            toast.error('Failed to load video');
        }
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="trends-container">
            {loading ? (
                <div className="loading-container">
                    <div className="loading-text">Loading...</div>
                </div>
            ) : error ? (
                <div className="loading">Error: {error}</div>
            ) : (
                <>
                    <div className="trends">
                        {trendingMovies.map((movie) => (
                            <div key={movie.id} className="trending_movies">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={`Trending ${movie.id + 1}`}
                                    id="trending_movie"
                                    onClick={() => handleMovieClick(movie.id)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="pagination-controls">
                        <button onClick={handlePreviousPage} disabled={page === 1} className="pagination-button">
                            Previous
                        </button>
                        <span className="page-number">Page {page}</span>
                        <button onClick={handleNextPage} className="pagination-button">
                            Next
                        </button>
                    </div>
                </>
            )}
            {selectedVideoKey && (
                <div className="video-modal">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${selectedVideoKey}`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    <MdClose onClick={() => setSelectedVideoKey('')} className="close-icon" />
                </div>
            )}
        </div>
    );
}

export default Trends;
