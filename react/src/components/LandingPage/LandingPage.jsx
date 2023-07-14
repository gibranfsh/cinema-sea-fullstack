import React from 'react'
import './LandingPage.css'
import './Carousel.css'
import Carousel from './Carousel'
import Movie from '../Movie/MovieCard'
import useSWR from 'swr';

const LandingPage = () => {
    const { data: movieData, error } = useSWR('MovieInfo/movie-data.json', async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) {
        console.error('Error fetching movie data:', error);
    }

    const nowAiringMovies = movieData ? movieData.slice(0, 4) : [];

    return (
        <div className="landing-container">
            <h1>Welcome to Cinema SEA official website!</h1>
            <div className="header-container">
                <div className="header-text">
                    <p>
                        Welcome to Cinema SEA, the rising star in the movie theater
                        industry! We are renowned for our affordable ticket prices and
                        diverse range of movie genres. Our popularity has attracted a large
                        customer base, but we understand the inconvenience of waiting in
                        long queues to purchase tickets. That's why we are proud to
                        introduce our brand-new movie ticket booking app.
                        <br />
                        <br />
                        With our app, you can effortlessly browse through an extensive
                        collection of movies at your fingertips. Enjoy the convenience of
                        selecting showtimes, choosing your preferred seats, and securing
                        your reservations in a matter of seconds. Say goodbye to waiting in
                        line and hello to a seamless moviegoing experience!
                    </p>
                </div>

                <div className="carousel-component">
                    <Carousel />
                </div>
            </div>

            <div className="now-airing-info">
                <h1>Now Airing</h1>
                <p>showing {movieData ? 4 : ""} out of {movieData ? movieData.length : ""}</p>

                <button className="see-other-movies" onClick={() => window.location.href = '/movies'}>
                    <i>See other movies</i>
                    <img src="/Landing/mdi_arrow-right.svg" alt="logo" className="arrow-icon" />
                </button>

            </div>

            <div className="now-airing-movies">
                {
                    nowAiringMovies.map((movie, index) => (
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

export default LandingPage