import React from 'react';
import './Sensibilisation.css';

function Sensibilisation() {
  return (
    <div className="Sensibilisation">
      <h1 className="titre">SENSIBILISATION</h1>
      <br />
      <div className="introForm">
        <p>
          Nous proposons aux professionnels de la Petite Enfance, ou du domaine
          artistique une sensibilisation à l&#39;apport de l&#39;Art et de la
          Culture dans le développement du tout-petit. (Socialisation, Aspect
          cognitif, imaginaire, créativité etc...)
        </p>
      </div>
      <div className="eveil">
        <h2>Sensibilisation Eveil Musical</h2>
        <br />
        <li>
          Apport théorique : les 5 fondamentaux ( Tempo, Intensité, Rythme,
          Harmonie,Mélodie).
        </li>
        <li>Choix des instruments et leur utilisation.</li>
        <li>
          Cadre de Jeu ( Nombre d’enfants, espace sécurisé et approprié etc…).
        </li>
        <li>Chansons d’hier et d’aujourd’hui, d’ici et d’ailleurs.</li>
        <li>Comptines et jeux de doigts.</li>
      </div>
    </div>
  );
}

export default Sensibilisation;
