import React from 'react'
import './PaymentPage.css'
import axiosClient from '../../axios-client';
import { ToastContainer, toast } from 'react-toastify'
import { useStateContext } from '../../contexts/ContextProvider';
import 'react-toastify/dist/ReactToastify.css'

const PaymentPage = (props) => {
    const { user, movieId, movieTitle, date, time, selectedSeats, newSeatsAvailability, totalPrice } = props
    const { setUser } = useStateContext();

    function formatNumber(number) {
        // Convert the number to string
        const numberString = String(number);

        const [integerPart, decimalPart = ''] = numberString.split('.');

        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

        return formattedNumber;
    }


    async function handleDecreaseBalance(decreaseValue) {
        const payload = {
            id: user.id,
            username: user.username,
            balance: user.balance - parseInt(decreaseValue)
        }

        axiosClient.put(`/users/${user.id}`, payload)
            .then(({ data }) => {
                setUser(data) // langsung aja karena $wrap = false
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDecreaseSeats = async () => {
        const payload = {
            movie_id: movieId,
            seat_array: newSeatsAvailability
        }

        axiosClient.put(`/seats/${movieId}`, payload)
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleConfirmPayment = async () => {
        // decrease the user's balance
        await handleDecreaseBalance(totalPrice)
        await handleDecreaseSeats()

        const payload = {
            user_id: user.id,
            movie_id: movieId,
            date: date,
            time: time,
            seats: selectedSeats,
            total_price: totalPrice
        }

        axiosClient.post('/tickets', payload)
            .then((res) => {
                toast.success("Payment confirmed! you will be redirected to the My Ticket page in a short time", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setTimeout(() => {
                    window.location.href = '/myticket'
                }, 5000)
            })
            .catch((err) => {
                toast.error("Payment failed!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            })
    }

    return (
        <div className="payment-page-container">
            <h1>Payment Receipt</h1>
            <img src="/Ticket/Line 3.svg" alt="line" className="line" />
            <div className="receipt">
                <div className="receipt-header">
                    <div className="receipt-header-top">
                        <p>Movie Title: </p>
                        <h2>{movieTitle}</h2>
                    </div>

                    <img src="/Ticket/Line 3.svg" alt="line" className="line" />

                    <div className="receipt-header-bottom">
                        <h3>Movie time: {time} WIB</h3>
                        <h3>Seats number: {selectedSeats.join(",")}</h3>
                        <p>Book by {user.name}</p>
                    </div>
                </div>
                <img src="/Ticket/Line 3.svg" alt="line" className="line" />
                <div className="receipt-footer">
                    <h2>Rp{formatNumber(totalPrice)}</h2>

                    <button className="confirm-payment" onClick={handleConfirmPayment}>
                        Confirm Payment
                    </button>
                </div>
            </div>
            <img src="/Ticket/Line 3.svg" alt="line" className="line" />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default PaymentPage