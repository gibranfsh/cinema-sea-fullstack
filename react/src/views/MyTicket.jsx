import MyTicketPage from '../components/Ticket/MyTicketPage'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

export default function MyTicket() {
    const { token } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="my-ticket-page">
            <MyTicketPage />
        </div>
    )
}