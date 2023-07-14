import BuyTicketPage from '../components/Ticket/BuyTicketPage'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate, useLocation } from 'react-router-dom'

export default function BuyTicket() {
    const { user, token } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const location = useLocation();

    if (!location.state) {
        return <Navigate to="/" />
    }

    const { movieId, movieTitle, ticketPrice, age_rating, movieDate, movieTime } = location.state

    return (
        <div className="buy-ticket-page">
            <BuyTicketPage
                user={user}
                movieId={movieId}
                movieTitle={movieTitle}
                ticketPrice={ticketPrice}
                age_rating={age_rating}
                movieDate={movieDate}
                movieTime={movieTime}
            />
        </div>
    )
}