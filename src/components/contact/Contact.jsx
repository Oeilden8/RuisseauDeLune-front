import React, { useContext } from 'react';
import GlobalContext from '../../context/context';
import './Contact.css';
import Bruno from '../../assets/Contact/Bruno.jpeg';
import Martine from '../../assets/Contact/Martine.jpeg';

function Contact() {
  const { adminID, setAlert, setAlertMsg } = useContext(GlobalContext);
  console.log(adminID, setAlert, setAlertMsg);

  return (
    <div className="Contact">
      <h2>CONTACTS</h2>
      <div className="intro">
        <h2 className="mail">ruisseaudelune@outlook.com</h2>
      </div>
      <div className="rectangle">
        <h2>Bruno</h2>
        <hr />
        <div className="presentation">
          <img src={Bruno} alt="Bruno" className="picture" />

          <p>
            Auteur-compositeur, chanteur et guitariste au sein de plusieurs
            groupes musicaux. Animateur Musicien intervenant dans des structures
            accueillant de jeunes enfants ( crèches, Relais Petite Enfance,
            ALSH, Hopital de jour etc…)
          </p>
        </div>
        <div className="diplomes">
          <p>
            Diplomé universitaire intitulé « la musique et le tout-petit, la
            musique et l’enfant en situation de handicap » au CFMI de
            Tours-Fondettes.
          </p>
        </div>
        <h4>07 81 39 71 45</h4>
        <button className="delete_button" type="button">
          SUPPRIMER
        </button>
      </div>

      <div className="rectangle">
        <h2>Martine</h2>
        <hr />
        <div className="presentation">
          <img src={Martine} alt="Martine" className="picture" />
          <p>
            Educatrice de Jeunes Enfants depuis de nombreuses années en
            multi-Accueil. A suivi différentes formations avec « Enfance et
            Musique » (autour de la musique, du chant, de la danse etc…)
          </p>
        </div>
        <div className="diplomes">
          <p>
            Diplomé universitaire intitulé « la musique et le tout-petit, la
            musique et l’enfant en situation de handicap » au CFMI de
            Tours-Fondettes.
          </p>
        </div>
        <h4>06 22 02 24 58</h4>
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

export default Contact;
