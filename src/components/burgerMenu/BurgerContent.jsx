import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerContent.css';

function BurgerContent({ handleClick }) {
  return (
    <div className="burger">
      <ul className="nav">
        <li>
          <NavLink to="/" className="navLink-burgerMenu" onClick={handleClick}>
            {' '}
            Accueil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ateliers"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Ateliers
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/spectacles"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Spectacles
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sensibilisation"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Sensibilisation
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/actualites"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Actualités
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Contactez-nous
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className="navLink-burgerMenu"
            onClick={handleClick}
          >
            Connectez-vous
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default BurgerContent;
