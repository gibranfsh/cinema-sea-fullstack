import React from 'react'
import './Movie.css'

const Movie = (props) => {
    
    return (
        <div className="movie-container">
            <img src={props.imagePath} alt={props.title} className="movie-image" />
            <h3>{props.title}</h3>

            <div className="movie-ar-tp">
                <div className="movie-age-rating">
                    <strong>Age Rating</strong>
                    <p>{props.ageRating}</p>
                </div>

                <div className="movie-ticket-price">
                    <strong>Ticket Price</strong>
                    <p>Rp{props.ticketPrice}</p>
                </div>
            </div>

            {/* `/movie/${props.id}` */}
            <button className="more-details-btn">
                More Details
            </button>
        </div>
    )
}

export default Movie