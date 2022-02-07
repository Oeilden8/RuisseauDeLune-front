import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Video from '../video/Video';

import GlobalContext from '../../context/context';
import './Workshop.css';

function Workshop() {
  const { adminID } = useContext(GlobalContext);
  const [ateliers, setAteliers] = useState([]);
  const [atelierDelete, setAtelierDelete] = useState();
  const [alertDelete, setAlertDelete] = useState(false);

  const getAteliers = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/events/type/atelier`)
      .then((resp) => {
        console.log(resp.data);
        return setAteliers(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAteliers();
  }, []);

  const handleDeleteAtelier = async () => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/${atelierDelete}`,
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          console.log(resp);
          setAlertDelete(false);
          getAteliers();
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="Workshop">
      <h2>ATELIERS</h2>
      <div className="intro">
        <p>
          La musique et le livre sont deux supports qui favorisent le langage,
          la communication, la socialisation, la concentration, l&#39;imaginaire
          et la créativité. <br /> <br /> Nous animons les séances avant tout
          par le jeu, la liberté d&#39;expression, d&#39;exploration.
          <br /> <br /> Ce sont des moments de plaisir partagé.
        </p>
      </div>

      {/* pop up alerte suppression */}
      {alertDelete ? (
        <div className="delete">
          <section className="delete-alert">
            Voulez vous supprimer cet atelier?
            <button
              type="button"
              className="button-add"
              onClick={handleDeleteAtelier}
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

      {/* liste ateliers recupérée avec axios et décomposée avec .map */}
      {ateliers.map((atelier) => (
        <>
          <div className="rectangle">
            <h3>{atelier.title}</h3>
            <hr />
            <div className="rectangle_image_description">
              {atelier.assets[0] ? (
                <div className="container_picture_workshop">
                  {atelier.assets[0].type === 'video' ? (
                    <Video
                      source={`${process.env.REACT_APP_BACKEND_URL}/${atelier.assets[0].source}`}
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${atelier.assets[0].source}`}
                      alt={`atelier: ${atelier.title}`}
                      className="picture_workshop"
                    />
                  )}
                </div>
              ) : null}

              <div className="text_workshop">
                <p>{atelier.description}</p>
              </div>
            </div>
            {adminID ? (
              <button
                className="delete_button"
                type="button"
                onClick={() => {
                  setAtelierDelete(atelier.id);
                  console.log(
                    `idAtelier recupérée ${atelierDelete} = ${atelier.ID}`
                  );
                  setAlertDelete(true);
                }}
              >
                SUPPRIMER
              </button>
            ) : null}
          </div>
        </>
      ))}
    </div>
  );
}

export default Workshop;
