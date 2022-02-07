import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div>
      <div className="home">
        <p className="eveil">
          Eveil Artistique et Culturel Petite Enfance et Handicap
        </p>
        <div className="intro" id="size">
          <p>
            Ateliers d&#39;éveil musical, ateliers autour de la littérature
            jeunesse, des spectacles adaptés...
          </p>
        </div>
        <section className="button-container">
          <NavLink to="/actualites" className="actu">
            <button type="button" className="home-buttons">
              ACTUALITÉS
            </button>
          </NavLink>

          <NavLink to="/ateliers" className="atelier">
            <button type="button" className="home-buttons">
              ATELIERS
            </button>
          </NavLink>

          <NavLink to="/spectacles" className="spectacle">
            <button type="button" className="home-buttons ">
              SPECTACLES
            </button>
          </NavLink>

          <NavLink to="/sensibilisation" className="sensi">
            <button type="button" className="home-buttons">
              SENSIBILISATION
            </button>
          </NavLink>

          <NavLink to="/contact" className=" contact">
            <button type="button" className="home-buttons">
              CONTACTEZ-NOUS
            </button>
          </NavLink>
        </section>
      </div>
      <p className="places">
        Nous intervenons dans les structures Multi-Accueil, les Relais Petite
        Enfance, les Structures d&#39;Accompagnement pour personnes en situation
        de handicap, les Centres de loisirs ...
      </p>
    </div>
  );
}

export default Home;
