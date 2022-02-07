import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalContext from '../../context/context';
import './Login.css';

function Login() {
  const { setAdminID, setAlert, setAlertMsg } = useContext(GlobalContext);
  const navigate = useNavigate();
  // state avec un objet prédéfini
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // on vérifie que les champs sont remplis
    if (!login.email) {
      setAlertMsg('Veuillez remplir le champ mail');
      setAlert(true);
    } else if (!login.password) {
      setAlertMsg('Veuillez remplir le champ mot de passe');
      setAlert(true);
    } else {
      try {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, login, {
            withCredentials: true,
          })
          .then((resp) => {
            setAdminID(resp.data.id);
            // console.log(adminID);
            // console.log(resp.data);
          })
          .then(() => {
            navigate('../admin', { replace: true });
          });
      } catch (err) {
        // console.log(err.response.data);
        setAlertMsg(`Erreur : ${err.response.data}`);
        setAlert(true);
      }
    }
    // .then useNavigate
    // stocker id admin dans state ds app, if (id) accès ok
  };

  return (
    <div className="login">
      <h2>IDENTIFIEZ-VOUS</h2>
      <section className="login-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label htmlFor="mail">
            <input
              type="email"
              placeholder="MAIL"
              value={login.email}
              // on rempli uniquement la valeur email en destructurant login
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="MOT DE PASSE"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </label>
          <button type="submit" className="button-login">
            LOG IN
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
