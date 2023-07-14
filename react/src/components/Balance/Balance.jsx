import React, { useState } from 'react'
import './Balance.css'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Balance = () => {
    const { user, setUser } = useStateContext()
    const [topUp, setTopUp] = useState(false) // set initial top up button clicked to false
    const [topUpGone, setTopUpGone] = useState(false) // set initial top up button gone to false
    const [withdraw, setWithdraw] = useState(false) // set initial withdraw button clicked to false
    const [withdrawGone, setWithdrawGone] = useState(false) // set initial withdraw button gone to false
    const [topUpAmount, setTopUpAmount] = useState(0) // set initial top up amount to 0
    const [withdrawAmount, setWithdrawAmount] = useState(0) // set initial withdraw amount to 0

    const topUpCondition = () => {
        setTopUp(!topUp)
        setWithdrawGone(!withdrawGone)
    }

    const withdrawCondition = () => {
        setWithdraw(!withdraw)
        setTopUpGone(!topUpGone)
    }

    const Min = (a, b) => {
        if (a < b) {
            return a
        } else {
            return b
        }
    }

    function formatNumber(number) {
        // Convert the number to string
        const numberString = String(number);

        const [integerPart, decimalPart = ''] = numberString.split('.');

        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

        return formattedNumber;
    }

    const handleAddBalance = async (e) => {
        e.preventDefault()

        if (topUpAmount < 0) {
            toast.error("Please enter a positive number", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return
        }

        const payload = {
            id: user.id,
            username: user.username,
            balance: user.balance + parseInt(topUpAmount)
        }

        axiosClient.put(`/users/${user.id}`, payload)
            .then(({ data }) => {
                setUser(data) // langsung aja karena $wrap = false
                setTopUpAmount(0)
                toast.success("Balance added successfully", {
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
            .catch((err) => {
                console.log(err);
                toast.error("Balance failed to add", {
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

    const handleWithdrawBalance = async (e) => {
        e.preventDefault()

        if (withdrawAmount < 0) {
            toast.error("Please enter a positive number", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return
        }

        if (withdrawAmount > 500000) {
            toast.error("Maximum withdrawal is Rp500.000", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return
        }
        if (withdrawAmount > user.balance) {
            toast.error("Insufficient balance", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            return

        }

        const payload = {
            id: user.id,
            username: user.username,
            balance: user.balance - parseInt(withdrawAmount)
        }

        axiosClient.put(`/users/${user.id}`, payload)
            .then(({ data }) => {
                setUser(data) // langsung aja karena $wrap = false
                setWithdrawAmount(0)
                toast.success("Balance withdrawn successfully", {
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
            .catch((err) => {
                console.log(err);
                toast.error("Balance failed to withdraw", {
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
        <div className="balance-container">
            <div className="balance-top-side">
                <h1>My Balance</h1>
                <p><strong>Available Balance:</strong> Rp{formatNumber(user.balance)}</p>
            </div>

            <div className="buttons">
                {!topUp ? (
                    <button disabled={topUpGone} className={topUpGone ? "disabled-button" : "balance-top-up"} onClick={topUpCondition}>
                        <p>Top Up</p>
                        <img src="/Balance/Vector.svg" alt="vector" className="vector" />
                    </button>
                ) : (
                    <button className="top-up-cancel-btn" onClick={topUpCondition}>Cancel</button>
                )}

                {!withdraw ? (
                    <button disabled={withdrawGone} className={withdrawGone ? "disabled-button" : "balance-withdraw"} onClick={withdrawCondition}>
                        <p>Withdraw</p>
                        <img src="/Balance/Withdraw.svg" alt="withdraw" className="withdraw" />
                    </button>
                ) : (
                    <button className="top-up-cancel-btn" onClick={withdrawCondition}>Cancel</button>
                )}
            </div>

            <div className="inputs">
                {topUp && (
                    <div className="top-up-form">
                        <strong>Enter the Amount (in Rupiah)</strong>
                        <input type="number" value={topUpAmount} onChange={(e) => setTopUpAmount(e.target.value)} placeholder="Enter the amount" />
                        <button className="top-up-submit-btn" onClick={handleAddBalance}>Add Balance</button>
                    </div>
                )}

                {withdraw && (
                    <div className="withdraw-form">
                        <strong>Enter the Amount (in Rupiah)</strong>
                        <p>*maximum withdrawal is Rp500.000</p>
                        <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Enter the amount" />
                        <button className="withdraw-submit-btn" onClick={handleWithdrawBalance}>Withdraw Balance</button>
                    </div>
                )}
            </div>
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

export default Balance