import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  // state avec un objet prédéfini
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // on vérifie que les champs sont remplis
    if (!login.email) {
      alert('Veuillez remplir le champ mail');
    } else if (!login.password) {
      alert('Veuillez remplir le champ mot de passe');
    } else {
      console.log(login);
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/login`,
          login,
          { withCredentials: true }
        );
        console.log(resp);
        console.log(resp.data);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="login">
      <h2>IDENTIFIEZ-VOUS</h2>
      <section className="login-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label htmlFor="mail">
            <input
              type="text"
              placeholder="MAIL"
              value={login.email}
              // on rempli uniquement la valeur email en destructurant login
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </label>
          <label htmlFor="password">
            <input
              type="text"
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
