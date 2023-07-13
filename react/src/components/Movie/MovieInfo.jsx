import React, { useState } from 'react'
import './MovieInfo.css'
import MovieTimeModal from './MovieTimeModal'

const MovieInfo = () => {
    const movieDataDummy = [
        {
            id: 1,
            title: "Fast X",
            date: "12-07-2003",
            time: "12:00",
            description: "Dom Torettoeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee dan keluarganya menjadi sasaran putra gembong narkoba Hernan Reyes yang pendendam.",
            release_date: "2023-05-17",
            poster_url: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
            age_rating: 15,
            ticket_price: 53000
        },
    ]
    const [showPopup, setShowPopup] = useState(false);

    function formatNumber(number) {
        // Convert the number to string
        const numberString = String(number);

        const [integerPart, decimalPart = ''] = numberString.split('.');

        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

        return formattedNumber;
    }

    const handleCancelTicket = () => {
        setShowPopup(true);
    };

    const handleCancelConfirm = () => {
        // Perform cancellation logic here
        // ...

        // Close the popup
        setShowPopup(false);
    };

    const handleCancelCancel = () => {
        // Close the popup
        setShowPopup(false);
    };

    return (
        <div className="movieinfo-container">
            <div className="movieinfo-header">
                <p><span className="underlined-text">Movies</span> {">" + " " + movieDataDummy[0].title}</p>
                <h1>{movieDataDummy[0].title}</h1>
                <p className="underlined-text">Available</p>
            </div>

            <div className="poster-buy-button">
                <div className="film-details">
                    <img src="Ticket/aaaa.jpg" alt="movie-poster" className="movie-posterz" />

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
                    <p>Rp{formatNumber(movieDataDummy[0].ticket_price)}</p>
                </div>

                <button className="buy-ticket-btn" onClick={handleCancelTicket}>
                    <p>Buy Ticket</p>
                </button>
            </div>
            {showPopup && (
                <div className="modal-overlay-movieinfo">
                    <div className="modal-movieinfo">
                        <MovieTimeModal
                            onCancel={handleCancelCancel}
                            onConfirm={handleCancelConfirm}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieInfo