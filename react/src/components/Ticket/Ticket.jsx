import React, { useState } from 'react'
import './Ticket.css'
import TicketCancellationPopup from './TicketCancellationPopup'

const Ticket = () => {
    const myTicketDummyData = [
        {
            id: 1,
            userId: 1, // id of the user who ordered the ticket
            title: "Fast X",
            poster_url: "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            orderedby: "Gibran",
            date: "12-07-2003",
            time: "12:00",
            seats: ["13", "14", "15"],
            totalPrice: 159000
        }
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
        <div className="ticket-container">
            <div className="ticket-header">
                <p>{myTicketDummyData[0].date}</p>
                <h3>Paid</h3>
            </div>

            <div className="ticket-body">
                {/* poster img tag */}
                <img src={myTicketDummyData[0].poster_url} alt="movie-poster" className="movie-poster" />

                <div className="ticket-body-info">
                    <div className="ticket-body-info-top">
                        <h2>{myTicketDummyData[0].title}</h2>
                        <p>Ordered by {myTicketDummyData[0].orderedby}</p>
                    </div>

                    <div className="ticket-body-info-bottom">
                        <p>{myTicketDummyData[0].time}, {myTicketDummyData[0].seats.length} seats</p>
                        <p>Seats number:<br /><strong>{myTicketDummyData[0].seats.join(", ")}, 16, 17, 18</strong></p>
                    </div>
                </div>
            </div>

            <img src="/Ticket/Line 3.svg" alt="line" className="line" />

            <div className="ticket-footer">
                <div className="total-price">
                    <p>Total Price</p>
                    <h2>Rp{formatNumber(myTicketDummyData[0].totalPrice)}</h2>
                </div>

                <div className="footer-buttons">
                    <button className="show-barcode">Show Barcode</button>
                    <button className="cancel-ticket" onClick={handleCancelTicket}>Cancel Ticket</button>
                </div>

                {showPopup && (
                    <div className="modal-overlay-ticket">
                        <TicketCancellationPopup
                            onCancel={handleCancelCancel}
                            onConfirm={handleCancelConfirm}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Ticket