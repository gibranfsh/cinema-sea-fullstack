import React from 'react'
import './MoviePage.css'
import Movie from './Movie'

const MoviePage = () => {
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
        <div className="moviepage-container">
            <h1>Available Movies</h1>
            <div className="available-movies">
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
                    title={movieDataDummy[0].title}
                    imagePath={movieDataDummy[0].poster_url}
                    ageRating={movieDataDummy[0].age_rating}
                    ticketPrice={movieDataDummy[0].ticket_price}
                />
            </div>
        </div>
    )
}

export default MoviePage