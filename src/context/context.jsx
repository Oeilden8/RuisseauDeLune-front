import React, { createContext, useState } from 'react';

// On déclare la création du context
const GlobalContext = createContext();

// on l'applique à tout les enfants
export const GlobalContextProvider = ({ children }) => {
  // on declare tous les states partagés

  // on crée le state qui recupère l'admin ID si elle existe et on le passe a tous les composants qui ont un accès admin
  const [adminID, setAdminID] = useState();

  return (
    // on crée le provider qui va entourer App et on lui passe les valeurs
    <GlobalContext.Provider value={{ adminID, setAdminID }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
