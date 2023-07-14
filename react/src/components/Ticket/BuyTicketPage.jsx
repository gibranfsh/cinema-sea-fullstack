import React, { useState, useEffect } from 'react'
import './BuyTicketPage.css'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axios-client';
import useSWR from 'swr';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BuyTicketPage = (props) => {
    const { user, movieId, movieTitle, ticketPrice, age_rating, movieDate, movieTime } = props
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([])
    const [totalPrice, setTotalPrice] = useState(selectedSeats.length * ticketPrice)
    const [isLoading, setIsLoading] = useState(true)
    // Get seats availability with API (seats/:movieID)
    const { data: seatsAvailabilityData } = useSWR(`/seats/${movieId}`, axiosClient.get)

    const [seatsAvailability, setSeatsAvailability] = useState([])

    useEffect(() => {
        if (seatsAvailabilityData) {
            const parsedSeatArray = JSON.parse(seatsAvailabilityData.data.seat_array);
            setSeatsAvailability(parsedSeatArray);
        }

        if (seatsAvailabilityData && isLoading) {
            setIsLoading(false);
        }

    }, [seatsAvailabilityData]);

    function formatNumber(number) {
        // Convert the number to string
        const numberString = String(number);

        const [integerPart, decimalPart = ''] = numberString.split('.');

        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

        return formattedNumber;
    }

    const handleSeatSelection = (seatNumber) => {
        // if seat is already selected, unselect it
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
            setTotalPrice(totalPrice - ticketPrice);
            return;
        }

        // if seat is available, select it
        if (seatsAvailability[seatNumber - 1] === 1) {
            // if 6 seats are already selected, do nothing
            if (selectedSeats.length === 6) {
                toast.error("You can only select up to 6 seats!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            setSelectedSeats([...selectedSeats, seatNumber]);
            setTotalPrice(totalPrice + ticketPrice);
        }
    }

    const handleConfirmOrder = () => {
        if (selectedSeats.length === 0) {
            toast.error("You must select at least one seat!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (user.age < age_rating) {
            toast.error("You are too young to watch this movie!, you will be redirected to the movies page in 5 seconds", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                window.location.href = "/movies";
            }, 6000);
            return;
        }

        if (user.balance < totalPrice) {
            toast.error("You don't have enough balance!, please top up your balance first in the My Balance page", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        // make the selected seats unavailable
        const newSeatsAvailability = [...seatsAvailability];
        selectedSeats.forEach((seat) => {
            newSeatsAvailability[seat - 1] = 0;
        });
        
        // navigate to payment page
        navigate('/payment', {
            state: {
                user: user,
                movieId: movieId,
                movieTitle: movieTitle,
                date: movieDate,
                time: movieTime,
                selectedSeats: selectedSeats,
                newSeatsAvailability: newSeatsAvailability,
                totalPrice: totalPrice
            }
        })
    }

    return (
        <div className="buy-ticket-container">
            <div className="buy-ticket-header">
                <p><span className="underlined-text">Movies</span> {"> " + movieTitle + " > Buy Ticket"}</p>
                <h1>{movieTitle}</h1>
                <p>Date: {movieDate}, Time: {movieTime}</p>
            </div>

            <div className="seat-color-info">
                <p>*you can choose more than one seat (max. 6)</p>

                <div className="available-info">
                    <img src="/Ticket/green.svg" alt="avail-seat" />
                    <p>Available</p>
                </div>

                <div className="selected-info">
                    <img src="/Ticket/yellow.svg" alt="selected-seat" />
                    <p>Selected</p>
                </div>

                <div className="unavailable-info">
                    <img src="/Ticket/red.svg" alt="unavail-seat" />
                    <p>Unavailable</p>
                </div>
            </div>

            <div className="buy-ticket-content">
                <h1>Choose Your Seat</h1>

                <p>Screen</p>

                {!isLoading ? (<div className="seats-container">
                    {/* there 64 seats */}
                    <div className="seats-row-1">
                        <div className="left-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 1;
                                const seatAvailability = seatsAvailability[index];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="right-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 9;
                                const seatAvailability = seatsAvailability[index + 8];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 8}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="seats-row-2">
                        <div className="left-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 17;
                                const seatAvailability = seatsAvailability[index + 16];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 16}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="right-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 25;
                                const seatAvailability = seatsAvailability[index + 24];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 24}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="seats-row-3">
                        <div className="left-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 33;
                                const seatAvailability = seatsAvailability[index + 32];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 32}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="right-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 41;
                                const seatAvailability = seatsAvailability[index + 40];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 40}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="seats-row-4">
                        <div className="left-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 49;
                                const seatAvailability = seatsAvailability[index + 48];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 48}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="right-seats">
                            {[...Array(8)].map((_, index) => {
                                const seatNumber = index + 57;
                                const seatAvailability = seatsAvailability[index + 56];
                                const isSelected = selectedSeats.includes(seatNumber);

                                let className = "seat";
                                if (seatAvailability === 0) {
                                    className = "unavailable-seat";
                                } else if (isSelected) {
                                    className = "selected-seat";
                                }

                                return (
                                    <button
                                        key={index + 56}
                                        disabled={seatAvailability === 0}
                                        className={className}
                                        onClick={() => { handleSeatSelection(seatNumber) }}
                                    >
                                        {seatNumber}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>) : (
                    <div className="seats-loading">
                        Loading...
                    </div>
                )}
            </div>

            <div className="buy-ticket-footer">
                <div className="buy-ticket-footer-left">
                    <p><strong>Choosen Seats: </strong>{selectedSeats.join(",")}</p>
                    <p><strong>Total Price: </strong>Rp{formatNumber(totalPrice)}</p>
                </div>

                <div className="buy-ticket-footer-right">
                    <button
                        className="confirm-order-button"
                        onClick={handleConfirmOrder}
                    >
                        <p>Confirm Order</p>
                        <img src="/Landing/mdi_arrow-right.svg" alt="" className="arrow-icon" />
                    </button>
                </div>
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

export default BuyTicketPage