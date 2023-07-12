import React, { useState } from 'react'
import './Balance.css'

const Balance = () => {
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

    // Find minimum
    const Min = (a, b) => {
        if (a < b) {
            return a
        } else {
            return b
        }
    }

    return (
        <div className="balance-container">
            <div className="balance-top-side">
                <h1>My Balance</h1>
                <p><strong>Available Balance:</strong> Rp{"350.000"}</p>
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
                        <button className="top-up-submit-btn">Add Balance</button>
                    </div>
                )}

                {withdraw && (
                    <div className="withdraw-form">
                        <strong>Enter the Amount (in Rupiah)</strong>
                        <p>*maximum withdrawal is Rp500.000</p>
                        <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="Enter the amount" />
                        <button className="withdraw-submit-btn">Withdraw Balance</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Balance