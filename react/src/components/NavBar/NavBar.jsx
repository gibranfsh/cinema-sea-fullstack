import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';

const NavBar = () => {
  const { user, token, setToken, setUser } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser(null);
        setToken(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatNumber(number) {
    // Convert the number to string
    const numberString = String(number);

    const [integerPart, decimalPart = ''] = numberString.split('.');

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const formattedNumber = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

    return formattedNumber;
  }

  return (
    <nav className="nav">
      <img
        src="/Navbar/seacinemalogo.svg"
        alt="logo"
        className="nav-logo"
        onClick={() => {
          window.location.href = '/';
        }}
      />
      <ul>
        <div className="feat-nav">
          <li>
            <a href="/movies">Movies</a>
          </li>

          <li>
            <a href="/myticket">My Tickets</a>
          </li>
        </div>

        <div className="reglog-nav">
          {token ? (
            // When token is available
            <li className="dropdown">
              <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <p>{user && user.username}</p>
              </button>

              <div className="dropdown-menu">
                <button className="dropdown-item-balance" onClick={() => window.location.href = '/mybalance'}>
                  Balance<br />Rp{user && formatNumber(user.balance)}
                </button>
                <button className="dropdown-item-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>

            </li>
          ) : (
            // When token is not available
            <>
              <li>
                <Link to="/register">Get Started</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </div>
      </ul>

      {/* For Mobile */}
      <img src="/Navbar/pajamas_hamburger.svg" alt="logo" className="nav-hamburger" />
    </nav>
  );
};

export default NavBar;
