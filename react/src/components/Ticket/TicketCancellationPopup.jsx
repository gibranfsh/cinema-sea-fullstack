import React from 'react';
import './TicketCancellationPopup.css';

const TicketCancellationPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="cancellation-popup-container">
      <div className="cancellation-popup">
        <p>Are you sure you want to cancel this ticket?</p>
        <p>It's not reversible, and your balance will be refunded.</p>
        <div className="popup-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default TicketCancellationPopup;