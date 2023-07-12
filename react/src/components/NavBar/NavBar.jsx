import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav">
      <img src="/Navbar/seacinemalogo.svg" alt="logo" className="nav-logo" onClick={() => { window.location.href = '/' }} />
      <ul>
        <div className="feat-nav">
          <li>
            <a href="/movies">Movies</a>
          </li>
          
          <li>
            <a href="/myticket">My Ticket</a>
          </li>
        </div>

        <div className="reglog-nav">
          <li>
            <a href="/register">Get Started</a>
          </li>

          <li>
            <a href="/login">Login</a>
          </li>
        </div>
      </ul>

      {/* For Mobile */}
      <img src="/Navbar/pajamas_hamburger.svg" alt="logo" className="nav-hamburger" />
    </nav>
  )
}

export default NavBar