import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Admin from './components/admin/Admin';
import Contact from './components/contact/Contact';
import Sensibilisation from './components/sensibilisation/Sensibilisation';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import News from './components/news/News';
import Shows from './components/shows/Shows';
import Workshop from './components/workshop/Workshop';

function App() {
  // on crée le state qui recupère l'admin ID si elle existe et on le passe a tous les composants qui ont un accès admin
  const [adminID, setAdminID] = useState();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home adminID={adminID} />} />
        <Route path="ateliers" element={<Workshop adminID={adminID} />} />
        <Route path="spectacles" element={<Shows adminID={adminID} />} />
        <Route
          path="sensibilisation"
          element={<Sensibilisation adminID={adminID} />}
        />
        <Route path="actualités" element={<News adminID={adminID} />} />
        <Route path="contact" element={<Contact adminID={adminID} />} />
        <Route path="admin" element={<Admin adminID={adminID} />} />
        {/* si adminId existe tu peux monter le composant admin */}
        {/* {adminID ? (
          <Route path="admin" element={<Admin adminID={adminID} />} />
        ) : (
          <Route
            path="admin"
            element={
              <h2>
                Vous n&#39;avez pas accès à la partie administrateur, veuillez
                vous connectez
              </h2>
            }
          />
        )} */}

        <Route
          path="login"
          element={<Login adminID={adminID} setAdminID={setAdminID} />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
