import React from 'react'
import PaymentPage from '../components/Payment/PaymentPage'
import { Navigate, useLocation } from 'react-router-dom'

const Payment = () => {
    const location = useLocation();

    // if null
    if (!location.state) {
        return <Navigate to="/" />
    }

    const { user, movieId, movieTitle, date, time, selectedSeats, newSeatsAvailability, totalPrice } = location.state
    return (
        <div className="payment-page">
            <PaymentPage
                user={user}
                movieId={movieId}
                movieTitle={movieTitle}
                date={date}
                time={time}
                selectedSeats={selectedSeats}
                newSeatsAvailability={newSeatsAvailability}
                totalPrice={totalPrice}
            />
        </div>
    )
}

export default Payment