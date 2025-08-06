// src/MovieFinder.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios: npm install axios

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const API_URL = 'https://www.omdbapi.com/';

const MovieFinder = () => {
  const [movieData, setMovieData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('inception');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovie = async () => {
    setLoading(true);
    setError('');
    setMovieData(null); // Clear previous data

    try {
      const response = await axios.get(`${API_URL}?t=${searchTerm}&apikey=${API_KEY}`);
      if (response.data.Response === 'True') {
        setMovieData(response.data);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movie data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []); // The empty array ensures this runs only once on component mount

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovie();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {movieData && (
        <div>
          <h2>{movieData.Title}</h2>
          <p>
            **IMDb Rating:** {movieData.imdbRating} / 10
          </p>
          <img src={movieData.Poster} alt={`${movieData.Title} Poster`} />
          <p>
            **Year:** {movieData.Year}
          </p>
          <p>
            **Plot:** {movieData.Plot}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieFinder;
