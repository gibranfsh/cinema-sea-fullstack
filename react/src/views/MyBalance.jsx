import Balance from '../components/Balance/Balance'
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

export default function MyBalance() {
    const { token } = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="my-balance-page">
            <Balance />
        </div>
    )
}