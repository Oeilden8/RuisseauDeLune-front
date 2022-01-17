import React from 'react';
import './Admin.css';

function Admin({ adminId }) {
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

        {/* liste admin */}
        <div className="admin-container">
          <section className="admin-list">
            Mail
            <button className="button-admin" type="button">
              SUPPRIMER
            </button>
          </section>
          <section className="admin-list">
            Mail 2
            <button className="button-admin" type="button">
              SUPPRIMER
            </button>
          </section>
        </div>
      </div>

      {/* partie ajouter articles */}
      <h2>AJOUTER</h2>
      <div>
        <form className="add-form">
          <label htmlFor="select-type">
            <select name="type">
              <option value="spectacle">ATELIER</option>
              <option value="atelier">SPECTACLE</option>
              <option value="actualite">ACTUALITE</option>
            </select>
          </label>
          <label htmlFor="title">
            <input type="text" placeholder="TITRE" />
          </label>
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
