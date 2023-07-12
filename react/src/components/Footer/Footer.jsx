import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="title">
        <h1>Contact us</h1>
      </div>

      <div className="content">
        <div className="content-office">
          <h2>Office</h2>
          <div className="office-address">
            <h3>Address</h3>
            <p>Pondok Cina, Kecamatan Beji, Kota Depok</p>
          </div>

          <div className="phone-email">
            <div className="phone">
              <h3>Phone</h3>
              <p>+0123456789</p>
            </div>
            <div className="email">
              <h3>Email</h3>
              <p>seacinema@cmpfst.com</p>
            </div>
          </div>
        </div>

        <div className="content-social">
          <h2>Social Media</h2>
          <div className="ig">
            <img src="/Footer/mdi_instagram.svg" alt="ig" />
            <a href="#">@seacinema</a>
          </div>

          <div className="twt">
            <img src="/Footer/mdi_twitter.svg" alt="twt" />
            <a href="#">@seacinema</a>
          </div>
        </div>

        <div className="back-to-top">
          <a href="#top">Back to the top</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer