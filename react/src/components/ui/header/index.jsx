import React from "react";
import { Link } from "react-router-dom";
import { avatar, globe, logo, signOut } from "../../../constants/images";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/exchange" className="header__nav-link">
                Exchange
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/wallet" className="header__nav-link">
                Wallets
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/roqqu" className="header__nav-link">
                Roqqu Hub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header__user-info">
        <div className="header__user-info-name">
          <img src={avatar} alt="" />
          <span>Olatunde Jeremiah</span>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="header__user-info-icons">
          <img src={globe} alt="" />
          <img src={signOut} alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
