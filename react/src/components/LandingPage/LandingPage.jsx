import React from 'react'
import './LandingPage.css'
import './Carousel.css'
import Carousel from './Carousel'
import Movie from '../Movie/Movie'

const LandingPage = () => {
    const movieDataDummy = [
        {
            id: 1,
            title: "Fast X",
            description: "Dom Toretto dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
            release_date: "2023-05-17",
            poster_url: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            age_rating: 15,
            ticket_price: 53000
        },
    ]

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
                    {/* for now i use image */}
                    {/* <img src="/Landing/a.jpg" alt="logo" className="carousel-image" /> */}
                </div>
            </div>

            <div className="now-airing-info">
                <h1>Now Airing</h1>
                <p>showing 4 out of 7</p>

                <button className="see-other-movies" onClick={() => window.location.href = '/movies'}>
                    <i>See other movies</i>
                    <img src="/Landing/mdi_arrow-right.svg" alt="logo" className="arrow-icon" />
                </button>
                
            </div>

            <div className="now-airing-movies">
                {/* now airing movies component */}
                <Movie
                    id={movieDataDummy[0].id}
                    title={movieDataDummy[0].title}
                    imagePath={movieDataDummy[0].poster_url}
                    ageRating={movieDataDummy[0].age_rating}
                    ticketPrice={movieDataDummy[0].ticket_price}
                />

                <Movie
                    id={movieDataDummy[0].id}
                    title={movieDataDummy[0].title}
                    imagePath={movieDataDummy[0].poster_url}
                    ageRating={movieDataDummy[0].age_rating}
                    ticketPrice={movieDataDummy[0].ticket_price}
                />

                <Movie
                    id={movieDataDummy[0].id}
                    title={movieDataDummy[0].title}
                    imagePath={movieDataDummy[0].poster_url}
                    ageRating={movieDataDummy[0].age_rating}
                    ticketPrice={movieDataDummy[0].ticket_price}
                />

                <Movie
                    id={movieDataDummy[0].id}
                    title={"Guardians of the Galaxy Vol. 3"}
                    imagePath={movieDataDummy[0].poster_url}
                    ageRating={movieDataDummy[0].age_rating}
                    ticketPrice={movieDataDummy[0].ticket_price}
                />

            </div>
        </div>
    )
}

export default LandingPage