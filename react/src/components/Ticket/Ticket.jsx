import React, { useState } from 'react'
import './Ticket.css'
import TicketCancellationPopup from './TicketCancellationPopup'

const Ticket = (props) => {
    const { id, title, poster_url, orderedby, date, time, seats, totalPrice, reload } = props;

    const [showPopup, setShowPopup] = useState(false);
    const seatArray = JSON.parse(seats); // Convert seats string to array

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

    const handleOnClose = () => {
        setShowPopup(false);
        reload();
    };

    const handleCancelCancel = () => {
        // Close the popup
        setShowPopup(false);
    };

    return (
        <div className="ticket-container">
            <div className="ticket-header">
                <p>{date}</p>
                <h3>Paid</h3>
            </div>

            <div className="ticket-body">
                {/* poster img tag */}
                <img src={poster_url} alt="movie-poster" className="movie-poster" />

                <div className="ticket-body-info">
                    <div className="ticket-body-info-top">
                        <h2>{title}</h2>
                        <p>Ordered by {orderedby}</p>
                    </div>

                    <div className="ticket-body-info-bottom">
                        <p>{time}, {seatArray.length} seats</p>
                        <p>Seats number:<br /><strong>{seatArray.join(", ")}</strong></p>
                    </div>
                </div>
            </div>

            <img src="/Ticket/Line 3.svg" alt="line" className="line" />

            <div className="ticket-footer">
                <div className="total-price">
                    <p>Total Price</p>
                    <h2>Rp{formatNumber(totalPrice)}</h2>
                </div>

                <div className="footer-buttons">
                    <button className="show-barcode">Show Barcode</button>
                    <button className="cancel-ticket" onClick={handleCancelTicket}>Cancel Ticket</button>
                </div>

                {showPopup && (
                    <div className="modal-overlay-ticket">
                        <TicketCancellationPopup
                            id={id}
                            totalPrice={totalPrice}
                            onCancel={handleCancelCancel}
                            onClose={handleOnClose}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Ticket