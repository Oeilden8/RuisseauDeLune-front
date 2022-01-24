import React, { useContext } from 'react';
import GlobalContext from './context/context';
import './index.css';

function Alert() {
  const { alertMsg, setAlert } = useContext(GlobalContext);
  const handleAlert = () => {
    setAlert(false);
  };

  return (
    <div className="alert">
      <section className="alert-box">
        {alertMsg}
        <button type="button" className="add_button" onClick={handleAlert}>
          ANNULER
        </button>
      </section>
    </div>
  );
}

export default Alert;
