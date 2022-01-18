import React from 'react';
import './News.css';
import kamishibai from '../../assets/Atelier-litterature-jeunesse/kamishibai.jpg';
import guitare from '../../assets/Atelier-eveil-musical/guitare.png';

function News() {
  return (
    <div className="News">
      <h2>ACTUALITÉS</h2>
      <div className="rectangle_news">
        <h3> Nom du spectacle </h3>
        <hr />
        <div className="rectangle_content_news">
          <img src={kamishibai} alt="test" className="picture_news" />
          <div className="rectangle_content_text">
            <p>Lieu :</p>
            <p>Spectacle joué du [....] au [....]</p>
            <p>
              Auteur-compositeur, chanteur et guitariste au sein de plusieurs
              groupes musicaux. Animateur Musicien intervenant dans des
              structures accueillant de jeunes enfants ( crèches, Relais Petite
              Enfance, ALSH, Hopital de jour etc…)
            </p>
          </div>
        </div>
      </div>
      <div className="rectangle_news">
        <h3> Nom du spectacle </h3>
        <hr />
        <div className="rectangle_content_news">
          <img src={guitare} alt="test" className="picture_news" />
          <div className="rectangle_content_text">
            <p>Lieu :</p>
            <p>Spectacle joué du [....] au [....]</p>
            <p>
              Auteur-compositeur, chanteur et guitariste au sein de plusieurs
              groupes musicaux. Animateur Musicien intervenant dans des
              structures accueillant de jeunes enfants ( crèches, Relais Petite
              Enfance, ALSH, Hopital de jour etc…)
            </p>
          </div>
        </div>
      </div>
      <div className="rectangle_news">
        <h3> Nom du spectacle </h3>
        <hr />
        <div className="rectangle_content_news">
          <img src={guitare} alt="test" className="picture_news" />
          <div className="rectangle_content_text">
            <p>Lieu :</p>
            <p>Spectacle joué du [....] au [....]</p>
            <p>
              Auteur-compositeur, chanteur et guitariste au sein de plusieurs
              groupes musicaux. Animateur Musicien intervenant dans des
              structures accueillant de jeunes enfants ( crèches, Relais Petite
              Enfance, ALSH, Hopital de jour etc…)
            </p>
          </div>
        </div>
      </div>
      <div className="rectangle_news">
        <h3> Nom du spectacle </h3>
        <hr />
        <div className="rectangle_content_news">
          <img src={kamishibai} alt="test" className="picture_news" />
          <div className="rectangle_content_text">
            <p>Lieu :</p>
            <p>Spectacle joué du [....] au [....]</p>
            <p>
              Auteur-compositeur, chanteur et guitariste au sein de plusieurs
              groupes musicaux. Animateur Musicien intervenant dans des
              structures accueillant de jeunes enfants ( crèches, Relais Petite
              Enfance, ALSH, Hopital de jour etc…)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
