import React from 'react';
import './Header.css';
import logo from '../../assets/Header/logo.png';
import BurgerMenu from '../burgerMenu/BurgerMenu';

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="logo" id="logo" />
      <h1 className="title">
        Compagnie <br /> Ruisseau de Lune
      </h1>
      <BurgerMenu />
    </div>
  );
}

export default Header;
