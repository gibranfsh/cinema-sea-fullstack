import React from 'react'
import './PaymentPage.css'

const PaymentPage = () => {
    return (
        <div className="payment-page-container">
            <h1>Payment Receipt</h1>
            <img src="/Ticket/Line 3.svg" alt="line" className="line" />
            <div className="receipt">
                <div className="receipt-header">
                    <div className="receipt-header-top">
                        <p>Movie Title: </p>
                        <h2>Fast X</h2>
                    </div>

                    <img src="/Ticket/Line 3.svg" alt="line" className="line" />

                    <div className="receipt-header-bottom">
                        <h3>Movie time: 12:00 WIB</h3>
                        <h3>Seats number: 13, 14, 15, 16, 17, 18</h3>
                        <p>Book by Gibran</p>
                    </div>
                </div>
                <img src="/Ticket/Line 3.svg" alt="line" className="line" />
                <div className="receipt-footer">
                    <h2>Rp159.000</h2>

                    <button className="confirm-payment">
                        Confirm Payment
                    </button>
                </div>
            </div>
            <img src="/Ticket/Line 3.svg" alt="line" className="line" />
        </div>
    )
}

export default PaymentPage