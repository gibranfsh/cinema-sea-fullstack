import React, { useState } from 'react'
import './MovieInfo.css'
import MovieTimeModal from './MovieTimeModal'
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const MovieInfo = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { id } = useParams();

    const { data: movieData, error } = useSWR('../MovieInfo/movie-data.json', async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) {
        console.error('Error fetching movie data:', error);
    }

    const movie = movieData && movieData.find((movie) => movie.id === Number(id));

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

    const handleCancelCancel = () => {
        // Close the popup
        setShowPopup(false);
    };

    return (
        <div className="movieinfo-container">
            <div className="movieinfo-header">
                <p><span onClick={() => window.location.href = "/movies"} className="underline-cursor">Movies</span> {">" + " " + (movieData ? movie.title : "")}</p>
                <h1>{movieData ? movie.title : ""}</h1>
                <p className="underlined-text">Available</p>
            </div>

            <div className="poster-buy-button">
                <div className="film-details">
                    <img src={movieData ? movie.poster_url : ""} alt="movie-poster" className="movie-posterz" />

                    <div className="film-details-text">
                        <div className="film-details-top">
                            <p>
                                {movieData ? movie.description : ""}
                            </p>
                        </div>

                        <div className="film-details-middle">
                            <div className="release-date">
                                <strong>Release Date : </strong><p>{movieData ? movie.release_date : ""}</p>
                            </div>

                            <div className="age-rating">
                                <strong>Age Rating : </strong><p>{movieData ? movie.age_rating : ""}</p>
                            </div>
                        </div>

                        <div className="see-trailer-btn" onClick={() => window.open('https://youtube.com')}>
                            <p>See Trailer</p>
                        </div>
                    </div>
                </div>

                <div className="ticket-price">
                    <img src="/MovieInfo/ep_ticket.svg" alt="ticket-icon" className="ticket-icon" />
                    <p>Rp{formatNumber(movieData ? movie.ticket_price : 0)}</p>
                </div>

                <button className="buy-ticket-btn" onClick={handleCancelTicket}>
                    <p>Buy Ticket</p>
                </button>
            </div>
            {showPopup && (
                <div className="modal-overlay-movieinfo">
                    <div className="modal-movieinfo">
                        <MovieTimeModal
                            movieId={movieData ? movie.id : ""}
                            movieTitle={movieData ? movie.title : ""}
                            ticketPrice={movieData ? movie.ticket_price : 0}
                            age_rating={movieData ? movie.age_rating : ""}
                            onCancel={handleCancelCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieInfo