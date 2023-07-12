import React from 'react'
import './MyTicketPage.css'
import Ticket from './Ticket'

const MyTicketPage = () => {
  return (
    <div className="myticket-container">
      <h1>My Tickets</h1>
      <div className="ticket-components">
        <Ticket />

        <Ticket />

        <Ticket />

        <Ticket />
      </div>
    </div>
  )
}

export default MyTicketPage