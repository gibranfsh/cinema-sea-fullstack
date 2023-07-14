import LoginForm from "../components/LoginForm/LoginForm";
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

export default function Login() {
    const { token } = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="login-page">
            <LoginForm />
        </div>
    )
}