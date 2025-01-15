import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './upcoming.css';

function Upcoming() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Page state for pagination

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true); // Set loading true on page change
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/upcoming?api_key=5e76b51b90290cffa75dede9e7533d60&page=${page}`
                );
                setUpcomingMovies(response.data.results);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch');
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);

    const toastError = () => {
        toast.error('Wait for movie to be released');
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
        <div className="upcoming-container">
            {loading ? (
                <div className="loading">Loading...</div>
            ) : error ? (
                <div className="loading">Error: {error}</div>
            ) : (
                <>
                    <div className="upcoming">
                        {upcomingMovies.map((movie) => (
                            <div key={movie.id} className="upcoming_movies">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    id="upcoming_movie"
                                    alt={`Upcoming ${movie.id + 1}`}
                                    onClick={toastError}
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
        </div>
    );
}

export default Upcoming;
