import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import GlobalContext from '../../context/context';
import guitare from '../../assets/Atelier-eveil-musical/guitare.png';
import kamishibai from '../../assets/Atelier-litterature-jeunesse/kamishibai.jpg';
import './Workshop.css';

function Workshop() {
  // const { adminID, event, setEvent, setAlert, setAlertMsg } = useContext(GlobalContext);
  const { adminID } = useContext(GlobalContext);
  const [ateliers, setAteliers] = useState([]);

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
      {ateliers.map((atelier) => ( 
        <div className="rectangle">
        <h3>{atelier.title}</h3>
        <hr />
        <div className="rectangle_image_description">
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
        ))}
       
        {adminID ? (
          <button className="delete_button" type="button">
            SUPPRIMER
          </button>
        ) : null}
      </div>
      <div className="rectangle">
        <h3>Autour du livre</h3>
        <hr />
        <div className="rectangle_image_description">
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
        {adminID ? (
          <button className="delete_button" type="button">
            SUPPRIMER
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Workshop;
