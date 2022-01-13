import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <h2>IDENTIFIEZ-VOUS</h2>
      <section className="login-container">
        <form className="login-form">
          <label htmlFor="mail">
            <input type="text" placeholder="mail" />
          </label>
          <label htmlFor="password">
            <input type="text" placeholder="mot de passe" />
          </label>
        </form>
        <button type="submit" className="button-login">
          LOG IN
        </button>
      </section>
    </div>
  );
}

export default Login;
