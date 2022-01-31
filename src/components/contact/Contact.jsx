import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../context/context';
import './Contact.css';

function Contact() {
  const { adminID, setAlert, setAlertMsg } = useContext(GlobalContext);
  console.log(adminID, setAlert, setAlertMsg);

  // get contacts
  const [contacts, setContacts] = useState([]);

  // popup alerte suppression
  const [alertDelete, setAlertDelete] = useState(false);

  // id du contact a supprimer
  const [contactDelete, setContactDelete] = useState();

  // get all contacts
  const getContacts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/contact`)
      .then((resp) => {
        console.log(resp.data);
        return setContacts(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getContacts();
  }, []);

  // delete one admin => penser a ajouter le withcredentials pour obtenir req.cookies dans le back à chaque requete admin
  const handleDeleteContact = async () => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/contact/${contactDelete}`,
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          console.log(resp);
          setAlertDelete(false);
          getContacts();
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Contact">
      <h2>CONTACTS</h2>
      <div className="intro">
        <h2 className="mail">ruisseaudelune@outlook.com</h2>
      </div>
      {contacts.map((contact) => (
        <div className="rectangle">
          <h2>{contact.firstname_lastname}</h2>
          <hr />
          <div className="presentation">
            <div className="container_picture_contact">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/${contact.source}`}
                alt={contact.asset_name}
                className="picture_contact"
              />
            </div>
            <p>{contact.presentation}</p>
          </div>
          <div className="diplomes">
            <p>{contact.diplomes}</p>
          </div>
          <h4>{contact.phone}</h4>
          {/* pop up alerte suppression */}
          {alertDelete ? (
            <div className="delete">
              <section className="delete-alert">
                Voulez vous supprimer ce contact?
                <button
                  type="button"
                  className="button-add"
                  onClick={handleDeleteContact}
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
          {adminID ? (
            <button
              className="button-admin"
              type="button"
              onClick={() => {
                setContactDelete(contact.id);
                setAlertDelete(true);
              }}
            >
              SUPPRIMER
            </button>
          ) : null}
        </div>
      ))}
      <p>
        Nous avons créé la compagnie Ruisseau de Lune avec Lorenzo (guitariste)
        en 2017.
      </p>
    </div>
  );
}

export default Contact;
