import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Video from '../video/Video';
import GlobalContext from '../../context/context';
import './Shows.css';

function Shows() {
  const { adminID, setAlert, setAlertMsg } = useContext(GlobalContext);
  const [spectacles, setSpectacles] = useState([]);
  const [spectacleDelete, setSpectacleDelete] = useState();
  const [alertDelete, setAlertDelete] = useState(false);

  const getSpectacles = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/events/type/spectacle`)
      .then((resp) => {
        // console.log(resp.data);
        return setSpectacles(resp.data);
      });
  };

  useEffect(() => {
    getSpectacles();
  }, []);

  const handleDeleteShow = async () => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/${spectacleDelete}`,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          // console.log(resp);
          setAlertDelete(false);
          getSpectacles();
        });
    } catch (err) {
      setAlertMsg('erreur lors de la suppression');
      setAlert(true);
    }
  };

  return (
    <div className="Shows">
      <h2>SPECTACLES</h2>

      {/* pop up alerte suppression */}
      {alertDelete ? (
        <div className="delete">
          <section className="delete-alert">
            Voulez vous supprimer cet atelier?
            <button
              type="button"
              className="button-add"
              onClick={handleDeleteShow}
            >
              VALIDER
            </button>
            <button
              type="button"
              className="button-add"
              onClick={() => {
                setAlertDelete(false);
              }}
            >
              ANNULER
            </button>
          </section>
        </div>
      ) : null}

      {/* liste spectacles recupérée avec axios et décomposée avec .map */}
      {spectacles.map((spectacle) => (
        <>
          <div className="rectangle">
            <h3>{spectacle.title}</h3>
            <hr />
            <div className="rectangle_image_description">
              {spectacle.assets[0] ? (
                <div className="container_picture_show">
                  {spectacle.assets[0].type === 'video' ? (
                    <Video
                      source={`${process.env.REACT_APP_BACKEND_URL}/${spectacle.assets[0].source}`}
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${spectacle.assets[0].source}`}
                      alt={`spectacle: ${spectacle.title}`}
                      className="picture_show"
                    />
                  )}
                </div>
              ) : null}

              <div className="text_show">
                <h6>{spectacle.places}</h6>
                <p>{spectacle.description}</p>
              </div>
            </div>
            {adminID ? (
              <button
                className="delete_button"
                type="button"
                onClick={() => {
                  setSpectacleDelete(spectacle.id);
                  setAlertDelete(true);
                }}
              >
                SUPPRIMER
              </button>
            ) : null}
          </div>
        </>
      ))}
      <div className="rectangle">
        <h3>Précédents spectacles</h3>
        <hr />
        <div className="rectangle_image_description">
          <div className="list_show">
            <li>
              Association d&#39;Assistantes Maternelles ADAMAC à la Salle de
              spectacle Doussineau à Chartres (28). <br /> 2 séances : la
              première pour les 0-3 ans la seconde pour les 3-5 ans (école
              maternelle).
            </li>
            <hr />
            <li>
              Salle des fêtes du Poinçonnet (36) pour l&#39;association &#34; le
              chat botté &#34; Association d&#39;assistantes maternelles.
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
              Association Ribambelle des assistantes maternelles de Mainvilliers
              (28).
            </li>
            <hr />
            <li>Centre de Loisirs de de Mainvilliers (28).</li>
            <hr />
            <li>
              Brezolles (28) dans le cadre de la journée sur la parentalité.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shows;
