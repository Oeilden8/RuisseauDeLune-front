/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../context/context';
import './Admin.css';
import ContactForm from './ContactForm';
import EventForm from './EventForm';
import WorkshopForm from './WorkshopForm';
import NewsForm from './NewsForm';

function Admin() {
  const {
    adminID,
    actionType,
    setActionType,
    news,
    setNews,
    event,
    setEvent,
    contact,
    setContact,
    setAlertMsg,
    setAlert,
    alertDelete,
    setAlertDelete,
  } = useContext(GlobalContext);

  // type d'evenements
  const [eventType, setEventType] = useState('atelier');
  // gere submit all form ou juste submit un nouvel asset
  const [submitType, setSubmitType] = useState('');
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
  // state upload image
  const [assetFile, setAssetFile] = useState();
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
        // console.log('admins', resp.data);
        return setAdmins(resp.data);
      });
  };

  // get all assets
  const getAllAssets = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/assets`)
      .then((resp) => {
        // console.log('assets', resp.data);
        return setAssets(resp.data);
      });
  };

  // get all events by type
  const getAllEvents = () => {
    // si le type d'event selectionné est news, on appelle la table news
    if (eventType === 'news') {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/news`)
        .then((resp) => {
          // console.log('news', resp.data);
          setEventList(resp.data);
        });
    }
    if (eventType === 'contact') {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/contact`)
        .then((resp) => {
          // console.log('contact', resp.data);
          setEventList(resp.data);
        });
    }
    if (eventType === 'atelier' || eventType === 'spectacle') {
      // sinon on appelle la table event sur la route getEventByType avec le param type stocké dans le state eventType : on recupère que les ateliers ou que les spectacles
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/type/${eventType}`
        )
        .then((resp) => {
          // console.log('events', resp.data);
          setEventList(resp.data);
        });
    }
  };

  // on passe l'argument eventType au useEffect, a chaque fois que la selection du type change il re render le composant pour afficher la bonne liste
  useEffect(() => {
    getAdmins();
    getAllAssets();
    getAllEvents();
  }, [eventType]);

  // delete one admin => penser a ajouter le withcredentials pour obtenir req.cookies dans le back à chaque requete admin
  const handleDeleteAdmin = async () => {
    // si admin.id recupérée par axios.get = adminId recupérée lors du login pas supprimer (car c'est l'admin actif)
    if (adminDelete === adminID) {
      // je fais apparaitre l'alerte avec le message
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
          // on ferme le popup alerte avec le state false et on affiche le status OK, on refais un getAdmin pour actualiser la liste -admin supprimé
          .then(() => {
            // console.log(resp);
            setAlertDelete(false);
            getAdmins();
            setStatus('Admin supprimé');
          });
      } catch (err) {
        setStatus("une erreur s'est produite");
      }
    }
  };

  // stocke l'asset ds le bon state
  const handleAssetChoice = (e) => {
    // console.log('assetid', e.target.value);
    if (eventType === 'news') {
      setNews({ ...news, assets_id: e.target.value });
    } else if (eventType === 'contact') {
      setContact({ ...contact, assets_id: e.target.value });
    } else if (eventType === 'spectacle' || eventType === 'atelier') {
      setEvent({ ...event, assets_id: e.target.value });
    } else if (!eventType) {
      setAlertMsg("Erreur en choisissant le type d'évènement");
      setAlert(true);
    } else {
      setAlertMsg("Erreur en enregistrant l'image");
      setAlert(true);
    }
  };

  // récupère le nouvel asset
  const handleNewAsset = (e) => {
    // console.log(e.target.files[0]);
    const selectedAsset = e.target.files[0];
    const { type } = selectedAsset;
    if (
      type !== 'image/png' &&
      type !== 'image/jpg' &&
      type !== 'image/jpeg' &&
      type !== 'video/mp4'
    ) {
      setAssetFile();
      setAlertMsg(
        'Veuillez selectionner une image .png ou .jpeg ou une video .mp4'
      );
      setAlert(true);
    } else {
      setAssetFile(e.target.files[0]);
      // console.log(assetFile);
    }
  };

  // envoie le nouvel asset au back
  const handleAssetSubmit = async () => {
    // FormData est un objet dispo ds le navigateur avec les données du formulaire
    const data = new FormData();
    // on y ajoute le nouveau fichier asset
    data.append('asset', assetFile);
    // on l'envoie au back avec axios
    const type = assetFile.type === 'video/mp4' ? 'videos' : 'images';
    try {
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/api/assets/upload?type=${type}`,
          data,
          {
            withCredentials: true,
          }
        )
        .then(() => {
          // console.log(resp);
          // on actualise la liste d'admin avec le nouveau
          getAllAssets();
          setStatus('nouvel asset créé');
        });
    } catch (err) {
      setStatus(`Erreur : ${err.response.data}`);
    }
  };

  // create admin
  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();
    // on vérifie que les champs sont remplis
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
          .then(() => {
            // console.log(resp);
            // on actualise la liste d'admin avec le nouveau
            getAdmins();
            setStatus('Admin créé');
          });
      } catch (err) {
        // console.log(err.response.data);
        setStatus(`Erreur : ${err.response.data}`);
      }
    }
  };

  // create event
  const handleEventSubmit = async () => {
    // console.log('event', event);
    // si l'action selectionnée est ajouter on fait un post
    if (actionType === 'ajouter') {
      // on vérifie que les champs obligatoires sont remplis
      if (!event.title) {
        setAlertMsg("Veuillez fournir un titre d'évènement");
        setAlert(true);
      } else if (
        !event.type ||
        event.type === 'news' ||
        event.type === 'contact'
      ) {
        setAlertMsg("Le type d'évènement n'est pas bien renseigné");
        setAlert(true);
      } else {
        try {
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/events`, event, {
              withCredentials: true,
            })
            .then(() => {
              // console.log('event', resp);
              getAllEvents();
              setStatus('Evènement créé');
            });
        } catch (err) {
          // console.log(err.response.data);
          setStatus("Erreur lors de la création de l'évènement");
        }
      }
      // si l'action selectionnée est modifier on fait un put
    } else if (actionType === 'modifier') {
      setEvent({ ...event, assets_id: '' });
      // console.log('update event', event, updateId);
      try {
        await axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/api/events/${updateId}`,
            event,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            // console.log('update', resp);
            setStatus('Evènement modifié');
          });
      } catch (err) {
        // console.log('update', err.response.data);
        setStatus("Erreur lors de la création de l'évènement");
      }
    } else {
      setAlertMsg('Veuillez selectionner ajouter ou modifier');
      setAlert(true);
    }
  };

  const handleNewsSubmit = async () => {
    // console.log(news);
    // si l'action selectionnée est ajouter on fait un post
    if (actionType === 'ajouter') {
      // on vérifie que les champs obligatoires sont remplis
      if (!news.title) {
        setAlertMsg("Veuillez fournir un titre d'évènement");
        setAlert(true);
      } else if (!news.date_first || !news.date_last) {
        setAlertMsg('Veuillez fournir des dates');
        setAlert(true);
      } else {
        try {
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/news`, news, {
              withCredentials: true,
            })
            .then(() => {
              // console.log('news', resp);
              setStatus('Actualité créée');
              // on actualise la liste avec la nouvelle news
              getAllEvents();
            });
        } catch (err) {
          // console.log(err.response);
          setStatus("Erreur lors de la création de l'actualité");
        }
      }
      // si l'action selectionnée est modifier on fait un put
    } else if (actionType === 'modifier') {
      // console.log('update news', news, updateId);
      try {
        await axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/api/news/${updateId}`,
            news,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            // console.log('update', resp);
            setStatus('Actualité modifiée');
          });
      } catch (err) {
        // console.log('update', err.response.data);
        setStatus("Erreur lors de la modification de l'évènement");
      }
    } else {
      setAlertMsg('Veuillez selectionner ajouter ou modifier');
      setAlert(true);
    }
  };

  // contact
  const handleContactSubmit = async () => {
    // console.log(contact);
    // si l'action selectionnée est ajouter on fait un post
    if (actionType === 'ajouter') {
      // on vérifie que les champs obligatoires sont remplis
      if (!contact.firstname_lastname) {
        setAlertMsg('Veuillez fournir le nom du contact');
        setAlert(true);
      } else {
        try {
          await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, contact, {
              withCredentials: true,
            })
            .then(() => {
              // console.log('contact', resp);
              setStatus('Contact créé');
              // on actualise la liste avec le nouveau contact
              getAllEvents();
            });
        } catch (err) {
          // console.log(err.response.data);
          setStatus('Erreur lors de la création du contact');
        }
      }
      // si l'action selectionnée est modifier on fait un put
    } else if (actionType === 'modifier') {
      // console.log('update contact', contact, updateId);
      try {
        await axios
          .put(
            `${process.env.REACT_APP_BACKEND_URL}/api/contact/${updateId}`,
            contact,
            {
              withCredentials: true,
            }
          )
          .then(() => {
            // console.log('update', resp);
            setStatus('Contact modifié');
          });
      } catch (err) {
        // console.log('update', err.response.data);
        setStatus('Erreur lors de la modification du contact');
      }
    } else {
      setAlertMsg('Veuillez selectionner ajouter ou modifier');
      setAlert(true);
    }
  };

  // choix de la fonction a utiliser en fonction du type d'evenement choisi
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(submitType);
    if (submitType === 'form') {
      if (eventType === 'news') {
        handleNewsSubmit();
      } else if (eventType === 'atelier' || eventType === 'spectacle') {
        handleEventSubmit();
      } else if (eventType === 'contact') {
        handleContactSubmit();
      } else {
        setAlertMsg("L'élément à modifier n'est pas bien renseigné");
        setAlert(true);
      }
    } else if (submitType === 'asset') {
      handleAssetSubmit();
    } else {
      setAlertMsg("erreur lors de l'envoi du formulaire");
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

      {/* partie ajouter ou modifier */}
      <h2>AJOUTER ou MODIFIER</h2>
      <div>
        <form className="add-form" onSubmit={handleSubmit}>
          {/* les 2 selecteurs : ajout/modif et type d'article */}
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
                  onClick={() => {
                    setEvent({ ...event, type: 'atelier' });
                    setEventType('atelier');
                  }}
                >
                  ATELIER
                </option>
                <option
                  value={eventType}
                  onClick={() => {
                    setEvent({ ...event, type: 'spectacle' });
                    setEventType('spectacle');
                  }}
                >
                  SPECTACLE
                </option>
                <option
                  value={eventType}
                  onClick={() => {
                    setEvent({ ...event, type: 'news' });
                    setEventType('news');
                  }}
                >
                  ACTUALITE
                </option>
                <option
                  value={eventType}
                  onClick={() => {
                    setEvent({ ...event, type: 'contact' });
                    setEventType('contact');
                  }}
                >
                  CONTACT
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
                    {eventPut.title || eventPut.firstname_lastname}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {/* le formulaire change en fonction du type d'evenement selectionné */}
          {(() => {
            switch (eventType) {
              case 'contact':
                return <ContactForm />;
              case 'news':
                return <NewsForm />;
              case 'spectacle':
                return <WorkshopForm />;
              case 'atelier':
                return <EventForm />;
              default:
                return null;
            }
          })()}

          {/* on ne peut changer l'asset que si l'admin modifie une news ou un contact */}
          {(actionType === 'modifier' && eventType === 'atelier') ||
          (actionType === 'modifier' && eventType === 'spectacle') ? (
            <p>Vous ne pouvez pas modifier l&#39;image ou la vidéo</p>
          ) : (
            <p>
              Ajouter une nouvelle image ou vidéo ou sélectionner dans la liste
            </p>
          )}
          {(actionType === 'modifier' && eventType === 'atelier') ||
          (actionType === 'modifier' && eventType === 'spectacle') ? null : (
            <section className="add-assets">
              <label htmlFor="asset">
                <input type="file" name="assetFile" onChange={handleNewAsset} />
              </label>
              <button
                className="button-admin"
                type="submit"
                onClick={() => setSubmitType('asset')}
              >
                ENVOYER
              </button>

              <label htmlFor="select-asset">
                <select name="asset">
                  <option>Choisir une image</option>
                  {/* on enregistre l'id de l'image cliquée ds le state assetId et on utilise la fonction handle.. pour la stocker dans event, news ou contact */}
                  {assets.map((asset) => (
                    <option
                      value={asset.id}
                      onClick={(e) => {
                        handleAssetChoice(e);
                      }}
                    >
                      {asset.asset_name}
                    </option>
                  ))}
                </select>
              </label>
            </section>
          )}

          <button
            type="submit"
            className="button-add"
            onClick={() => setSubmitType('form')}
          >
            VALIDER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
