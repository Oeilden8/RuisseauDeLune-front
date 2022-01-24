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
import Alert from './Alert';

function App() {
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
    <div className="App">
      <Header />
      {alert ? <Alert alertMsg={alertMsg} setAlert={setAlert} /> : null}
      {/* <Alert alertMsg={alertMsg} setAlert={setAlert} /> */}
      <Routes>
        <Route path="/" element={<Home adminID={adminID} />} />
        <Route
          path="ateliers"
          element={
            <Workshop
              adminID={adminID}
              event={event}
              setEvent={setEvent}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
        <Route
          path="spectacles"
          element={
            <Shows
              adminID={adminID}
              event={event}
              setEvent={setEvent}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
        <Route
          path="sensibilisation"
          element={<Sensibilisation adminID={adminID} />}
        />
        <Route
          path="actualites"
          element={
            <News
              adminID={adminID}
              news={news}
              setNews={setNews}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
        <Route
          path="contact"
          element={
            <Contact adminID={adminID} alert={alert} setAlert={setAlert} />
          }
        />

        {/* pour le moment admin accessible sans login pendant le developpement */}
        <Route
          path="admin"
          element={
            <Admin
              adminID={adminID}
              event={event}
              setEvent={setEvent}
              news={news}
              setNews={setNews}
              alert={alert}
              setAlert={setAlert}
              setAlertMsg={setAlertMsg}
            />
          }
        />
        {/* si adminId existe tu peux monter le composant admin */}
        {/* {adminID ? (
          <Route path="admin" element={<Admin adminID={adminID} event={event}
              setEvent={setEvent}
              news={news}
              setNews={setNews}/>}
              alert={alert}
              setAlert={setAlert} />
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
          element={
            <Login
              adminID={adminID}
              setAdminID={setAdminID}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
