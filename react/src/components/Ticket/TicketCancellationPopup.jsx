import React from 'react';
import './TicketCancellationPopup.css';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';
import 'react-toastify/dist/ReactToastify.css'

const TicketCancellationPopup = ({ id, totalPrice, onCancel, onClose }) => {
  const { user, setUser } = useStateContext();

  const handleAddBalance = async () => { // add balance after canceling ticket
    const payload = {
      id: user.id,
      username: user.username,
      balance: user.balance + parseInt(totalPrice)
    }

    axiosClient.put(`/users/${user.id}`, payload)
      .then(({ data }) => {
        setUser(data) // langsung aja karena $wrap = false
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleCancelTicket = async () => {
    await handleAddBalance()

    axiosClient.delete(`/tickets/${id}`)
      .then(() => {
        onClose()
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <div className="cancellation-popup-container">
      <div className="cancellation-popup">
        <p>Are you sure you want to cancel this ticket?</p>
        <p>It's not reversible, and your balance will be refunded.</p>
        <div className="popup-buttons">
          <button onClick={handleCancelTicket}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default TicketCancellationPopup;