import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../context/context';
import './Admin.css';

function Admin() {
  const {
    adminID,
    news,
    setNews,
    event,
    setEvent,
    setAlertMsg,
    setAlert,
    eventType,
    setEventType,
    actionType,
    setActionType,
  } = useContext(GlobalContext);

  // get admins
  const [admins, setAdmins] = useState([]);
  // get assets
  const [assets, setAssets] = useState([]);
  // get events
  const [eventList, setEventList] = useState([]);
  // id de l'event à modifier
  const [updateId, setUpdateId] = useState([]);
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

  // get all admins
  const getAdmins = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/admins`)
      .then((resp) => {
        console.log('admins', resp.data);
        return setAdmins(resp.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  // get all assets
  const getAllAssets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/assets`)
      .then((resp) => {
        console.log('assets', resp.data);
        return setAssets(resp.data);
      });
  };

  // get all events by type
  const getAllEvents = () => {
    if (eventType === 'news') {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/news`)
        .then((resp) => {
          console.log('news', resp.data);
          return setEventList(resp.data);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/type/${eventType}`
        )
        .then((resp) => {
          console.log('events', resp.data);
          return setEventList(resp.data);
        });
    }
  };

  useEffect(() => {
    getAdmins();
    getAllAssets();
    getAllEvents();
  }, [eventType]);

  // delete one admin => penser a ajouter le withcredentials pour obtenir req.cookies dans le back à chaque requete admin
  const handleDeleteAdmin = async () => {
    // si admin.id recupérée par axios.get = adminId recupérée lors du login pas supprimer (car c'est l'admin actif)
    if (adminDelete === adminID) {
      setAlertMsg(
        "Vous ne pouvez pas supprimer l'administrateur actuellement connecté"
      );
      setAlert(true);
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
    } else if (!newAdmin.password) {
      setAlertMsg('Veuillez remplir le champ mot de passe');
      setAlert(true);
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
        setStatus('Erreur lors de la création de Admin');
      }
    }
  };

  // create event
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEvent({ ...event, type: eventType });
    console.log('event', event);
    if (!event.title) {
      setAlertMsg("Veuillez fournir un titre d'évènement");
      setAlert(true);
    } else if (eventType !== 'spectacle' && eventType !== 'atelier') {
      setAlertMsg("Le type d'évènement n'est pas bien renseigné");
      setAlert(true);
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/events`, event, {
            withCredentials: true,
          })
          .then((resp) => {
            console.log('event', resp);
            setStatus('Evènement créé');
          });
      } catch (err) {
        console.log(err.response.data);
        setStatus('Erreur lors de la création de évènement');
      }
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    console.log(news);
    if (actionType === 'ajouter') {
      if (!news.title) {
        setAlertMsg("Veuillez fournir un titre d'évènement");
        setAlert(true);
      } else {
        try {
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/news`, news, {
              withCredentials: true,
            })
            .then((resp) => {
              console.log('news', resp);
              setStatus('Actualité créée');
            });
        } catch (err) {
          console.log(err.response.data);
          setStatus('Erreur lors de la création de évènement');
        }
      }
    } else if (actionType === 'modifier') {
      console.log('update news', news);
      try {
        await axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/api/news/${updateId}`,
            news,
            {
              withCredentials: true,
            }
          )
          .then((resp) => {
            console.log('update', resp);
            setStatus('Actualité modifiée');
          });
      } catch (err) {
        console.log('update', err.response.data);
        setStatus('Erreur lors de la modification de évènement');
      }
    } else {
      setAlertMsg('Veuillez selectionner ajouter ou modifier');
      setAlert(true);
    }
  };

  return (
    <div>
      {/* partie gestion admin */}
      <h2>Administrateurs</h2>
      <div className="Admin">
        {/* formulaire create admin */}
        <form className="new-admin" onSubmit={handleNewAdminSubmit}>
          Créer un nouveau
          <label htmlFor="email">
            <input
              type="email"
              placeholder="MAIL"
              value={newAdmin.email}
              // on rempli uniquement la valeur email en destructurant le state newAdmin
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

      {/* si le state status est rempli, affiche ce state prévu pour afficher un message d'erreur ou de succès */}
      {status ? <h5>{status}</h5> : null}

      {/* partie ajouter articles */}
      <h2>AJOUTER ou MODIFIER</h2>
      <div>
        {/* si le type est news on fait la fonction post news, sinon on fait la fonction post event */}
        <form
          className="add-form"
          onSubmit={eventType === 'news' ? handleNewsSubmit : handleEventSubmit}
        >
          {/* les 2 selecteurs : ajout/modif et type d'event */}
          <section className="selectors">
            <label htmlFor="select-action">
              <select name="action">
                <option
                  value={actionType}
                  onClick={() => setActionType('ajouter')}
                >
                  AJOUTER
                </option>
                <option
                  value={actionType}
                  onClick={() => setActionType('modifier')}
                >
                  MODIFIER
                </option>
              </select>
            </label>
            <label htmlFor="select-type">
              <select name="type">
                <option
                  value={eventType}
                  onClick={() => setEventType('atelier')}
                >
                  ATELIER
                </option>
                <option
                  value={eventType}
                  onClick={() => setEventType('spectacle')}
                >
                  SPECTACLE
                </option>
                <option value={eventType} onClick={() => setEventType('news')}>
                  ACTUALITE
                </option>
              </select>
            </label>
          </section>

          {/* selecteur d'event a modifier présent seulement si action selectionnée "modifier" */}
          {actionType === 'modifier' ? (
            <label htmlFor="select-update">
              <select name="update" id="update">
                <option>Choisissez un article à modifier</option>
                {/* on affiche les resultat du getallevent by type dans le selecteur, et on recup l'id de l'event au clic */}
                {eventList.map((eventPut) => (
                  <option
                    value={eventPut.id}
                    onClick={() => setUpdateId(eventPut.id)}
                  >
                    {eventPut.title}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label htmlFor="title">
            {/* suivant le type selectionné on envoie les infos dans des state différents */}
            <input
              type="text"
              placeholder="TITRE"
              value={eventType === 'news' ? news.title : event.title}
              onChange={
                eventType === 'news'
                  ? (e) => setNews({ ...news, title: e.target.value })
                  : (e) => setEvent({ ...event, title: e.target.value })
              }
            />
          </label>

          {/* le formulaire change suivant le type selectionné plus haut */}
          {eventType === 'spectacle' || eventType === 'news' ? (
            <label htmlFor="places">
              <input
                type="text"
                placeholder="LIEU"
                value={eventType === 'news' ? news.places : event.places}
                onChange={
                  eventType === 'news'
                    ? (e) => setNews({ ...news, places: e.target.value })
                    : (e) => setEvent({ ...event, places: e.target.value })
                }
              />
            </label>
          ) : null}

          {eventType === 'news' ? (
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
              value={
                eventType === 'news' ? news.description : event.description
              }
              onChange={
                eventType === 'news'
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
                <option>Choisir une image</option>
                {assets.map((asset) => (
                  <option
                    value={asset.id}
                    onClick={
                      eventType === 'news'
                        ? () => setNews({ ...news, assets_id: asset.id })
                        : () => setEvent({ ...event, assets_id: asset.id })
                    }
                  >
                    {asset.asset_name}
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
