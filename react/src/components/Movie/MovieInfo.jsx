import React from 'react'
import './MovieInfo.css'

const MovieInfo = () => {
    const movieDataDummy = [
        {
            id: 1,
            title: "Fast X",
            description: "Dom Torettoeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
            release_date: "2023-05-17",
            poster_url: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            age_rating: 15,
            ticket_price: 53000
        },
    ]

    return (
        <div className="movieinfo-container">
            <div className="movieinfo-header">
                <p><span className="underlined-text">Movies</span> {">" + " " + movieDataDummy[0].title}</p>
                <h1>{movieDataDummy[0].title}</h1>
                <p className="underlined-text">Available</p>
            </div>

            <div className="poster-buy-button">
                <div className="film-details">
                    <img src={movieDataDummy[0].poster_url} alt="movie-poster" className="movie-poster" />

                    <div className="film-details-text">
                        <div className="film-details-top">
                            <p>
                                {movieDataDummy[0].description}
                            </p>
                        </div>

                        <div className="film-details-middle">
                            <div className="release-date">
                                <strong>Release Date : </strong><p>{movieDataDummy[0].release_date}</p>
                            </div>

                            <div className="age-rating">
                                <strong>Age Rating : </strong><p>{movieDataDummy[0].age_rating}</p>
                            </div>
                        </div>

                        <div className="see-trailer-btn">
                            <p>See Trailer</p>
                        </div>
                    </div>
                </div>

                <div className="ticket-price">
                    <img src="/MovieInfo/ep_ticket.svg" alt="ticket-icon" className="ticket-icon" />
                    <p>Rp{movieDataDummy[0].ticket_price}</p>
                </div>

                <button className="buy-ticket-btn">
                    <p>Buy Ticket</p>
                </button>
            </div>
        </div>
    )
}

export default MovieInfo