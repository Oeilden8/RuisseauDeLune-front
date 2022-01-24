import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import GlobalContext from './context/context';
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
  const { alert } = useContext(GlobalContext);

  return (
    <div className="App">
      <Header />
      {alert ? <Alert /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="ateliers" element={<Workshop />} />
        <Route path="spectacles" element={<Shows />} />
        <Route path="sensibilisation" element={<Sensibilisation />} />
        <Route path="actualites" element={<News />} />
        <Route path="contact" element={<Contact />} />

        {/* pour le moment admin accessible sans login pendant le developpement */}
        <Route path="admin" element={<Admin />} />
        {/* si adminId existe tu peux monter le composant admin */}
        {/* {adminID ? (
          <Route path="admin" element={<Admin /> : (
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
