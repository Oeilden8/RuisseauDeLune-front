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

  // state formulaire evenements
  const [event, setEvent] = useState({
    title: '',
    places: '',
    description: '',
    asset_id: '',
  });

  // state formulaire si type actu
  const [news, setNews] = useState({
    title: '',
    places: '',
    date_first: '',
    date_last: '',
    description: '',
    asset_id: '',
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
