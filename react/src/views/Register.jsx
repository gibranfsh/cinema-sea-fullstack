import RegisterForm from "../components/RegisterForm/RegisterForm";
import { useStateContext } from '../contexts/ContextProvider'
import { Navigate } from 'react-router-dom'

export default function Register() {
    const { token } = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="register-page">
            <RegisterForm />
        </div>
    )
}