import React, { useContext } from 'react';
import GlobalContext from '../../context/context';
import './Sensibilisation.css';

function Sensibilisation() {
  const { adminID } = useContext(GlobalContext);
  console.log(adminID);

  return (
    <div className="Sensibilisation">
      <h2 className="titre">SENSIBILISATION</h2>
      <div className="intro">
        <p>
          Nous proposons aux professionnels de la Petite Enfance, ou du domaine
          artistique une sensibilisation à l&#39;apport de l&#39;Art et de la
          Culture dans le développement du tout-petit. (Socialisation, Aspect
          cognitif, imaginaire, créativité etc...)
        </p>
      </div>
      <div className="rectangle">
        <h3>Sensibilisation Eveil Musical</h3>
        <hr />
        <br />
        <div className="rectangle_image_description">
          <div className="list_show_sensibilisation">
            <li>
              Apport théorique : les 5 fondamentaux ( Tempo, Intensité, Rythme,
              Harmonie, Mélodie).
            </li>
            <br />
            <li>Choix des instruments et leur utilisation.</li>
            <br />
            <li>
              Cadre de Jeu ( Nombre d’enfants, espace sécurisé et approprié
              etc…).
            </li>
            <br />
            <li>Chansons d’hier et d’aujourd’hui, d’ici et d’ailleurs.</li>
            <br />
            <li>Comptines et jeux de doigts.</li>
            <br />
          </div>
        </div>
        <button className="delete_button" type="button">
          SUPPRIMER
        </button>
      </div>
      <div className="rectangle">
        <h3>Sensibilisation Autour du Livre</h3>
        <hr />
        <br />
        <div className="rectangle_image_description">
          <div className="list_show_sensibilisation">
            <li>
              Apport théorique : le livre permet à l’enfant une meilleure
              compréhension du monde qui l’entoure, favorise le langage, stimule
              son imaginaire, permet un moment de plaisir partagé privilégié
              (reconnaissance de soi et sécurité affective)
            </li>
            <br />
            <li>
              Le livre comme support pour aborder un sujet (sommeil,
              alimentation, séparation, émotions, déménagement, arrivée d’une
              frère ou d’une sœur…)
            </li>
            <br />
            <li>
              Le livre à libre disposition et manipulation. Choix des livres
              (thème, taille, matière…)
            </li>
            <br />
            <li>
              Différentes façons de raconter une histoire ( kamishibai, théâtre
              d’ombres, raconte-robe, raconte-tapis etc…)
            </li>
            <br />
          </div>
        </div>
        <button className="delete_button" type="button">
          SUPPRIMER
        </button>
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

export default Sensibilisation;
