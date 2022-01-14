import React from 'react';
import './Shows.css';
import ribambelle from '../../assets/Spectacle/Ribambelle.jpg';

function Shows() {
  return (
    <div className="Shows">
      <h2>SPECTACLES</h2>
      <div className="rectangle">
        <h3>Goutte d&#39;eau</h3>
        <hr />
        <div className="rectangle_image_description">
          <div className="image_show">
            <img src={ribambelle} alt="guitare" className="pictures_show" />
          </div>
          <div className="text_show">
            <p>
              Durée : 30mn <br /> A partir de : 6 mois et jusqu&#39;à 5 ans.{' '}
              <br /> <br />
              L&#39;eau comme élément central est prétexte à un voyage onirique.
              L&#39;enfant est invité à découvrir un univers sensoriel, composé
              de musiques douces ou rythmées, de jeux d&#39;ombres, de chansons
              originales et d&#39;effets visuels et sonores. L&#39;absence de
              narration laisse le jeune spectateur libre dans son interprétation
              et son imaginaire, le tout dans un décor épuré. <br /> <br />{' '}
            </p>
          </div>
        </div>
        <button className="delete_button" type="button">
          SUPPRIMER
        </button>
      </div>
      <div className="rectangle">
        <h3>Précédents spectacles</h3>
        <hr />
        <div className="rectangle_image_description">
          <div className="list_show">
            <ul>
              <li>
                Association d&#39;Assistantes Maternelles ADAMAC à la Salle de
                spectacle Doussineau à Chartres (28). <br /> 2 séances : la
                première pour les 0-3 ans la seconde pour les 3-5 ans (école
                maternelle).
              </li>
              <hr />
              <li>
                Salle des fêtes du Poinçonnet (36) pour l&#39;association &#34;
                le chat botté &#34; Association d&#39;assistantes maternelles.
              </li>
              <hr />
              <li>
                Salle de la micro-crèche Briance Roselle à St Hilaire Bonneval
                (87).
              </li>
              <hr />
              <li>Esperem Crèche Paris 6ème.</li>
              <hr />
              <li>
                Association Ribambelle des assistantes maternelles de
                Mainvilliers (28).
              </li>
              <hr />
              <li>Centre de Loisirs de de Mainvilliers (28).</li>
              <hr />
              <li>
                Brezolles (28) dans le cadre de la journée sur la parentalité.
              </li>
            </ul>
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

export default Shows;
