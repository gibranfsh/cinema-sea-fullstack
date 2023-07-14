import React from 'react'
import './MoviesPage.css'
import Movie from './MovieCard'
import useSWR from 'swr';

const MoviesPage = () => {
    const { data: movieData, error } = useSWR('MovieInfo/movie-data.json', async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) {
        console.error('Error fetching movie data:', error);
    }

    return (
        <div className="moviepage-container">
            <h1>Available Movies</h1>
            <div className="available-movies">
                {movieData &&
                    movieData.map((movie, index) => (
                        <Movie
                            key={index}
                            id={movie.id}
                            title={movie.title}
                            imagePath={movie.poster_url}
                            ageRating={movie.age_rating}
                            ticketPrice={movie.ticket_price}
                        />
                    ))}
            </div>
        </div>
    )
}

export default MoviesPage