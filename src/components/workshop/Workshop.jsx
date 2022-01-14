import React from 'react';
import './Workshop.css';
import guitare from '../../assets/Atelier-eveil-musical/guitare.png';
import kamishibai from '../../assets/Atelier-litterature-jeunesse/kamishibai.jpg';

function Workshop({ adminID }) {
  return (
    <div className="Workshop">
      <h2>ATELIERS</h2>
      <p>
        La musique et le livre sont deux supports qui favorisent le langage, la
        communication, la socialisation, la concentration, l&#39;imaginaire et
        la créativité. <br /> <br /> Nous animons les séances avant tout par le
        jeu, la liberté d&#39;expression, d&#39;exploration.
        <br /> <br /> Ce sont des moments de plaisir partagé.
      </p>
      <div className="rectangle_workshop">
        <h3>Éveil Musical</h3>
        <hr />
        <div className="rectangle_image_description_workshop">
          <div className="image_workshop">
            <img src={guitare} alt="guitare" className="pictures_workshop" />
          </div>
          <div className="text_workshop">
            <p>
              Exploration musicale grâce à de multiples instruments : Guitare,
              Balafon, Petites percussions, métallophone, ukulele, harmonica,
              kazoo etc... Découverte de chansons d&#39;hier et
              d&#39;aujourd&#39;hui, d&#39;ici et d&#39;ailleurs Jeux musicaux
              corporels.
            </p>
          </div>
        </div>
        {adminID ? (
          <button className="delete_button" type="button">
            SUPPRIMER
          </button>
        ) : null}
      </div>
      <div className="rectangle_workshop">
        <h3>Autour du livre</h3>
        <hr />
        <div className="rectangle_image_description_workshop">
          <div className="image_workshop">
            <img src={kamishibai} alt="guitare" className="pictures_workshop" />
          </div>
          <div className="text_workshop">
            <p>
              Mille et une façons de raconter des histoires : kamishibaî,
              raconte-robe, raconte-tapis, théâtre d&#39;ombres avec de nombreux
              albums jeunesse.
            </p>
          </div>
        </div>
        <button className="delete_button" type="button">
          SUPPRIMER
        </button>
      </div>
      <div className="circle_workshop">
        <h3>Nos lieux d&#39;intervention actuels et réguliers</h3>
        <hr />
        <div className="circle_image_description_workshop">
          <div className="text_workshop">
            <p>
              Multi-Accueil, Relais Petite Enfance, Structures
              d&#39;Accompagnement pour personnes en situation de handicap,
              Centres de loisirs mais aussi Ateliers Enfants-Parents et Ateliers
              Inter-générationnels.
            </p>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button className="add_button" type="button">
          AJOUTER
        </button>
        <button className="edit_button" type="button">
          MODIFIER
        </button>
      </div>
    </div>
  );
}

export default Workshop;
