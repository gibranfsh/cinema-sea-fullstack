import React, { useState } from 'react';
import './MyTicketPage.css';
import Ticket from './Ticket';
import axiosClient from '../../axios-client';
import { ToastContainer, toast } from 'react-toastify'
import useSWR from 'swr';
import { useStateContext } from '../../contexts/ContextProvider';

const MyTicketPage = () => {
  const { user, token } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);

  const { data: ticketsData, error: ticketsError } = useSWR(
    token && user ? `/tickets/${user.id}` : null,
    (url) =>
      axiosClient.get(url).then((response) => {
        setIsLoading(false); // Set isLoading to false when data is fetched
        return response.data;
      })
  );
  const { data: movieData, error: movieError } = useSWR('/MovieInfo/movie-data.json', async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  if (ticketsError) {
    console.error('Error fetching tickets:', ticketsError);
  }

  if (movieError) {
    console.error('Error fetching movie data:', movieError);
  }

  const handleReload = () => {
    toast.success('Ticket successfully cancelled!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    window.location.reload();
  };

  return (
    <div className="myticket-container">
      <h1>My Tickets</h1>
      <div className="ticket-components">
        {isLoading ? (
          <div>Loading...</div>
        ) : ticketsData && ticketsData.length === 0 ? (
          <div>You don't have any ticket history.</div>
        ) : (
          ticketsData &&
          movieData &&
          ticketsData.map((ticket, index) => {
            const selectedMovie = movieData.find((movie) => movie.id === Number(ticket.movie_id));

            return (
              <Ticket
                key={index}
                id={ticket.id}
                title={selectedMovie.title}
                poster_url={selectedMovie.poster_url}
                orderedby={user.name}
                date={ticket.date}
                time={ticket.time}
                seats={ticket.seats}
                totalPrice={ticket.total_price}
                reload={handleReload}
              />
            );
          })
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
  );
};

export default MyTicketPage;
