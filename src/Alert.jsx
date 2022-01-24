import React from 'react';
import './index.css';

function Alert(props) {
  const { alertMsg, setAlert } = props;
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
