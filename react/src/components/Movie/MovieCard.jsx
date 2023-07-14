import React, { useEffect, useState } from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
  const { id, imagePath, title, ageRating, ticketPrice } = props;
  const [isAppearing, setIsAppearing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppearing(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleRedirect = () => {
    window.location.href = `/movie/${id}`;
  };

  return (
    <div className={`movie-container ${isAppearing ? 'appear' : ''}`}>
      <img src={imagePath} alt={title} className="movie-image" />
      <h3>{title}</h3>

      <div className="movie-ar-tp">
        <div className="movie-age-rating">
          <strong>Age Rating</strong>
          <p>{ageRating}</p>
        </div>
        <img src="/MovieInfo/Line 22.svg" alt="line" />
        <div className="movie-ticket-price">
          <strong>Ticket Price</strong>
          <p>Rp{ticketPrice}</p>
        </div>
      </div>

      <button className="more-details-btn" onClick={handleRedirect}>
        More Details
      </button>
    </div>
  );
};

export default MovieCard;
