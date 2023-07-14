import React from 'react'
import './MovieCard.css'

const MovieCard = (props) => {
    const handleRedirect = () => {
        window.location.href = `/movie/${props.id}`
    }

    return (
        <div className="movie-container">
            <img src={props.imagePath} alt={props.title} className="movie-image" />
            <h3>{props.title}</h3>

            <div className="movie-ar-tp">
                <div className="movie-age-rating">
                    <strong>Age Rating</strong>
                    <p>{props.ageRating}</p>
                </div>
                <img src="/MovieInfo/Line 22.svg" alt="line" />
                <div className="movie-ticket-price">
                    <strong>Ticket Price</strong>
                    <p>Rp{props.ticketPrice}</p>
                </div>
            </div>

            {/* `/movie/${props.id}` */}
            <button className="more-details-btn" onClick={handleRedirect}>
                More Details
            </button>
        </div>
    )
}

export default MovieCard