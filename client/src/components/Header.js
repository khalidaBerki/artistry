import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';
import logo from '../assets/logo.png'; // Importer le logo

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      {/* Navigation */}
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/catalogue">Catalogue</Link></li>
          <li><Link to="/about">À propos de nous</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
