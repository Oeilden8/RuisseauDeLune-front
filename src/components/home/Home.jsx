import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <p className="eveil">
        Eveil Artistique et Culturel Petite Enfance et Handicap
      </p>
      <div className="intro">
        <p>
          Ateliers d&#39;éveil musical, ateliers autour de la littérature
          jeunesse, des spectacles adaptés... <br /> <br />
          Partenaires et amis de longue date, nous mêlons nos savoirs sur la
          petite enfance à nos univers artistiques pour éveiller les tout
          petits...
        </p>
      </div>
      <section className="button-container">
        <button type="button" className="home-buttons atelier">
          <NavLink to="/ateliers">ATELIERS</NavLink>
        </button>
        <button type="button" className="home-buttons spectacle">
          <NavLink to="/spectacles">SPECTACLES</NavLink>
        </button>
        <button type="button" className="home-buttons sensi">
          <NavLink to="/sensibilisation">SENSIBILISATION</NavLink>
        </button>
        <button type="button" className="home-buttons actu">
          <NavLink to="/actualites">ACTUALITÉS</NavLink>
        </button>
        <button type="button" className="home-buttons contact">
          CONTACTEZ-NOUS
        </button>
      </section>
      <p className="places">
        Nous intervenons dans les structures Multi-Accueil, les Relais Petite
        Enfance, les Structures d&#39;Accompagnement pour personnes en situation
        de handicap, les Centres de loisirs ...
      </p>
    </div>
  );
}

export default Home;
