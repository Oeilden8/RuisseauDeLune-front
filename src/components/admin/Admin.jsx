import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Admin.css';

function Admin({ adminId }) {
  const [type, setType] = useState('atelier');
  const [admins, setAdmins] = useState([]);
  const [adminDelete, setAdminDelete] = useState();
  const [alertDelete, setAlertDelete] = useState(false);

  // get all admins
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/admins`)
      .then((resp) => {
        console.log(resp.data);
        return setAdmins(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteAdmin = async () => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/admins/${adminDelete}`
        )
        .then((resp) => {
          console.log(resp);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {/* partie gestion admin */}
      <h2>Administrateurs</h2>
      <div className="Admin">
        <form className="new-admin">
          Créer un nouveau
          <label htmlFor="email">
            <input type="email" placeholder="MAIL" />
          </label>
          <label htmlFor="password">
            <input type="password" placeholder="MOT DE PASSE" />
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
              {/* si admin id recupérée par axios = adminID recupérée lors du login pas de bouton supprimer (car c'est l'admin actif) */}
              {admin.id === adminId ? (
                <p>Vous êtes connecté</p>
              ) : (
                <button
                  className="button-admin"
                  type="button"
                  onClick={() => {
                    setAdminDelete(admin.id);
                    console.log(`idAdmin recupérée ${adminDelete}`);
                    setAlertDelete(true);
                  }}
                >
                  SUPPRIMER
                </button>
              )}
            </section>
            {/* <section className="admin-list">
              Mail 2
              <button className="button-admin" type="button">
                SUPPRIMER
              </button>
            </section> */}
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
            <input type="text" placeholder="TITRE" />
          </label>

          {/* le formulaire change suivant le type selectionné plus haut */}
          {type === 'spectacle' || type === 'news' ? (
            <label htmlFor="places">
              <input type="text" placeholder="LIEU" />
            </label>
          ) : null}

          {type === 'news' ? (
            <section className="dates">
              <label htmlFor="date-first">
                DATE DE DEBUT :
                <input type="date" />
              </label>
              <label htmlFor="date-last">
                DATE DE FIN :
                <input type="date" />
              </label>
            </section>
          ) : null}

          <label htmlFor="description">
            <textarea name="description" placeholder="DESCRIPTION" />
          </label>
          <p>Ajouter une image ou une vidéo</p>
          <section className="add-assets">
            <button className="button-admin" type="button">
              NOUVELLE
            </button>
            <label htmlFor="select-asset">
              <select name="asset">
                <option value="asset1">IMAGE</option>
                <option value="asset2">Image2</option>
                <option value="asset3">Vidéo</option>
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
