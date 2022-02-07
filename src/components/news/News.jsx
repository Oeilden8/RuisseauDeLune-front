import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../context/context';
import './News.css';

function News() {
  const { adminID, setAlert, setAlertMsg } = useContext(GlobalContext);
  console.log(adminID, setAlert, setAlertMsg);

  const [Actus, setActus] = useState([]);
  // get assets
  // const [assets, setAssets] = useState([]);
  // id de l'admin a supprimer
  const [newsDelete, setNewsDelete] = useState();
  // popup alerte suppression
  const [alertDelete, setAlertDelete] = useState(false);
  // message de confirmation pour delete
  // const [status, setStatus] = useState('');
  // const [assetId, setAssetId] = useState();

  // get all News
  const getNews = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/news`)
      .then((resp) => {
        console.log(resp.data);
        return setActus(resp.data);
      })
      .catch((err) => console.log(err));
  };

  // // get all assets
  // const getAllAssets = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/api/assets`)
  //     .then((resp) => {
  //       console.log(resp.data);

  //       return setAssets(resp.data);
  //     });
  // };

  useEffect(() => {
    getNews();
    // getAllAssets();
  }, []);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const handleDeleteNews = async () => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/api/news/${newsDelete}`, {
          withCredentials: true,
        })
        .then((resp) => {
          console.log(resp);
          setAlertDelete(false);
          getNews();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="News">
      <h2>ACTUALITÉS</h2>
      {Actus.map((news) => (
        <div className="rectangle_news">
          <h3> {news.title} </h3>
          <hr />
          <div className="rectangle_content_news">
            <div className="container_picture_news">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${news.source}`}
                alt={news.asset_name}
                className="picture_news"
              />
            </div>
            <div className="rectangle_content_text">
              <p>Lieu : {news.places}</p>
              <p>
                Spectacle joué du{' '}
                {new Date(news.date_first).toLocaleString('fr-FR', options)} au{' '}
                {new Date(news.date_last).toLocaleString('fr-FR', options)}
              </p>
              <p>{news.description}</p>
              {adminID ? (
                <button
                  className="delete_button"
                  type="button"
                  onClick={() => {
                    setNewsDelete(news.id);
                    setAlertDelete(true);
                  }}
                >
                  SUPPRIMER
                </button>
              ) : null}
            </div>
          </div>
          {/* pop up alerte suppression */}
          {alertDelete ? (
            <div className="delete">
              <section className="delete-alert">
                Voulez vous supprimer cette actualité?
                <button
                  type="button"
                  className="button-add"
                  onClick={handleDeleteNews}
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
        </div>
      ))}
    </div>
  );
}

export default News;
