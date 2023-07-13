import React, { useState } from 'react'
import './MovieTimeModal.css'

const MovieTimeModal = ({ onCancel, onConfirm }) => {
    const [movieTime, setMovieTime] = useState("");
    const [movieDate, setMovieDate] = useState("");

    const handleMovieTime = (time, date) => {
        // if movie time is already selected, unselect it
        if (movieTime === time) {
            setMovieTime("");
            setMovieDate("");
        }
        // else, select the movie time
        else {
            setMovieTime(time);
            setMovieDate(date);
        }
    };

    return (
        <div className="cancellation-popup-container">
            <div className="cancellation-popup">
                <h2>Please choose the move time</h2>

                <div className='mt-12-container'>
                    <h4>12-07-2023</h4>
                    <div className="movie-time-12">
                        <button className={movieTime === "12:00" ? "selected" : "unselected"} onClick={() => handleMovieTime("12:00", "12-07-2023")}>12:00</button>
                        <button className={movieTime === "14:00" ? "selected" : "unselected"} onClick={() => handleMovieTime("14:00", "12-07-2023")}>14:00</button>
                        <button className={movieTime === "16:00" ? "selected" : "unselected"} onClick={() => handleMovieTime("16:00", "12-07-2023")}>16:00</button>
                        <button className={movieTime === "18:00" ? "selected" : "unselected"} onClick={() => handleMovieTime("18:00", "12-07-2023")}>18:00</button>
                    </div>
                </div>

                <div className='mt-13-container'>
                    <h4>13-07-2023</h4>
                    <div className="movie-time-13">
                        <button className={movieTime === "12:30" ? "selected" : "unselected"} onClick={() => handleMovieTime("12:30", "13-07-2023")}>12:30</button>
                        <button className={movieTime === "14:30" ? "selected" : "unselected"} onClick={() => handleMovieTime("14:30", "13-07-2023")}>14:30</button>
                        <button className={movieTime === "18:30" ? "selected" : "unselected"} onClick={() => handleMovieTime("18:30", "13-07-2023")}>18:30</button>
                        <button className={movieTime === "21:00" ? "selected" : "unselected"} onClick={() => handleMovieTime("21:00", "13-07-2023")}>21:00</button>
                    </div>
                </div>

                <div className="popup-buttons">
                    {movieTime !== "" ? <button onClick={onConfirm}>Confirm</button> : null}
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default MovieTimeModal;