import React, { createContext, useState } from 'react';

// On déclare la création du context
const GlobalContext = createContext();

// on l'applique à tout les enfants
export const GlobalContextProvider = ({ children }) => {
  // on declare tous les states partagés

  // on crée le state qui recupère l'admin ID si elle existe et on le passe a tous les composants qui ont un accès admin
  const [adminID, setAdminID] = useState();

  // state pour l'ouverture des alertes et le message
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    'Oups... Un message dalerte doit safficher'
  );

  // type d'evenements
  const [eventType, setEventType] = useState('atelier');

  // type d'action ajouter ou modifier
  const [actionType, setActionType] = useState('ajouter');

  // state formulaire evenements
  const [event, setEvent] = useState({
    title: '',
    type: '',
    places: '',
    description: '',
    assets_id: '',
  });

  // state formulaire si type actu
  const [news, setNews] = useState({
    title: '',
    places: '',
    date_first: '',
    date_last: '',
    description: '',
    assets_id: '',
  });

  return (
    // on crée le provider qui va entourer App et on lui passe les valeurs
    <GlobalContext.Provider
      value={{
        adminID,
        setAdminID,
        alert,
        setAlert,
        alertMsg,
        setAlertMsg,
        event,
        setEvent,
        news,
        setNews,
        eventType,
        setEventType,
        actionType,
        setActionType,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
