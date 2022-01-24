import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin({
  adminID,
  news,
  setNews,
  event,
  setEvent,
  setAlertMsg,
  setAlert,
}) {
  // type d'evenements
  const [type, setType] = useState('atelier');
  // get admins
  const [admins, setAdmins] = useState([]);
  // get assets
  const [assets, setAssets] = useState([]);
  // id de l'admin a supprimer
  const [adminDelete, setAdminDelete] = useState();
  // popup alerte suppression
  const [alertDelete, setAlertDelete] = useState(false);
  // state formulaire create admin
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
  });
  // message de confirmation pour delete-create
  const [status, setStatus] = useState('');
  const [assetId, setAssetId] = useState();

  // get all admins
  const getAdmins = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/admins`)
      .then((resp) => {
        console.log(resp.data);
        return setAdmins(resp.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  // get all assets
  const getAllAssets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/assets`)
      .then((resp) => {
        console.log(resp.data);
        console.log(assetId);
        return setAssets(resp.data);
      });
  };

  useEffect(() => {
    getAdmins();
    getAllAssets();
  }, []);

  // delete one admin => penser a ajouter le withcredentials pour obtenir req.cookies dans le back à chaque requete admin
  const handleDeleteAdmin = async () => {
    // si admin.id recupérée par axios.get = adminId recupérée lors du login pas supprimer (car c'est l'admin actif)
    if (adminDelete === adminID) {
      alert(
        "Vous ne pouvez pas supprimer l'administrateur actuellement connecté"
      );
    } else {
      try {
        await axios
          .delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/admins/${adminDelete}`,
            {
              withCredentials: true,
            }
          )
          .then((resp) => {
            console.log(resp);
            setAlertDelete(false);
            getAdmins();
            setStatus('Admin supprimé');
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  // create admin
  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdmin.email) {
      setAlertMsg('Veuillez remplir le champ mail');
      setAlert(true);
      // alert('Veuillez remplir le champ mail');
    } else if (!newAdmin.password) {
      alert('Veuillez remplir le champ mot de passe');
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/admins`, newAdmin, {
            withCredentials: true,
          })
          .then((resp) => {
            console.log(resp);
            getAdmins();
            setStatus('Admin créé');
          });
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      {/* partie gestion admin */}
      <h2>Administrateurs</h2>
      {status ? <h3>{status}</h3> : null}
      <div className="Admin">
        {/* formulaire create admin */}
        <form className="new-admin" onSubmit={handleNewAdminSubmit}>
          Créer un nouveau
          <label htmlFor="email">
            <input
              type="email"
              placeholder="MAIL"
              value={newAdmin.email}
              // on rempli uniquement la valeur email en destructurant newAdmin
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="MOT DE PASSE"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />
          </label>
          <button type="submit" className="button-add">
            VALIDER
          </button>
        </form>

        {/* pop up alerte suppression */}
        {alertDelete ? (
          <div className="delete">
            <section className="delete-alert">
              Voulez vous supprimer cet admin?
              <button
                type="button"
                className="button-add"
                onClick={handleDeleteAdmin}
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

        {/* liste admin recupérée avec axios et décomposée avec .map */}
        {admins.map((admin) => (
          <div className="admin-container">
            <section className="admin-list">
              {admin.email}
              <button
                className="button-admin"
                type="button"
                onClick={() => {
                  setAdminDelete(admin.id);
                  console.log(`idAdmin recupérée ${adminDelete} = ${adminID}`);
                  setAlertDelete(true);
                }}
              >
                SUPPRIMER
              </button>
            </section>
          </div>
        ))}
      </div>

      {/* partie ajouter articles */}
      <h2>AJOUTER</h2>
      <div>
        <form className="add-form">
          <label htmlFor="select-type">
            <select name="type">
              <option value={type} onClick={() => setType('atelier')}>
                ATELIER
              </option>
              <option value={type} onClick={() => setType('spectacle')}>
                SPECTACLE
              </option>
              <option value={type} onClick={() => setType('news')}>
                ACTUALITE
              </option>
            </select>
          </label>
          <label htmlFor="title">
            {/* suivant le type selectionné on envoie les infos dans des state différents */}
            <input
              type="text"
              placeholder="TITRE"
              value={type === 'news' ? news.title : event.title}
              onChange={
                type === 'news'
                  ? (e) => setNews({ ...news, title: e.target.value })
                  : (e) => setEvent({ ...event, title: e.target.value })
              }
            />
          </label>

          {/* le formulaire change suivant le type selectionné plus haut */}
          {type === 'spectacle' || type === 'news' ? (
            <label htmlFor="places">
              <input
                type="text"
                placeholder="LIEU"
                value={type === 'news' ? news.places : event.places}
                onChange={
                  type === 'news'
                    ? (e) => setNews({ ...news, places: e.target.value })
                    : (e) => setEvent({ ...event, places: e.target.value })
                }
              />
            </label>
          ) : null}

          {type === 'news' ? (
            <section className="dates">
              <label htmlFor="date-first">
                DATE DE DEBUT :
                <input
                  type="date"
                  value={news.date_first}
                  onChange={(e) =>
                    setNews({ ...news, date_first: e.target.value })
                  }
                />
              </label>
              <label htmlFor="date-last">
                DATE DE FIN :
                <input
                  type="date"
                  value={news.date_last}
                  onChange={(e) =>
                    setNews({ ...news, date_last: e.target.value })
                  }
                />
              </label>
            </section>
          ) : null}

          <label htmlFor="description">
            <textarea
              name="description"
              placeholder="DESCRIPTION"
              value={type === 'news' ? news.description : event.description}
              onChange={
                type === 'news'
                  ? (e) => setNews({ ...news, description: e.target.value })
                  : (e) => setEvent({ ...event, description: e.target.value })
              }
            />
          </label>
          <p>Ajouter une image ou une vidéo</p>
          <section className="add-assets">
            <button className="button-admin" type="button">
              NOUVELLE
            </button>
            <label htmlFor="select-asset">
              <select name="asset">
                {assets.map((asset) => (
                  <option value={asset.id} onClick={() => setAssetId(asset.id)}>
                    {asset.source}
                  </option>
                ))}
              </select>
            </label>
          </section>
          <button type="submit" className="button-add">
            VALIDER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
