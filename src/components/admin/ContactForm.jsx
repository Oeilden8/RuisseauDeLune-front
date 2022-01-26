import React, { useContext } from 'react';
import GlobalContext from '../../context/context';
import './Admin.css';

function ContactForm() {
  const { contact, setContact } = useContext(GlobalContext);

  return (
    <div>
      <label htmlFor="fullname">
        <input
          type="text"
          placeholder="NOM"
          value={contact.firstname_lastname}
          onChange={(e) =>
            setContact({ ...contact, firstname_lastname: e.target.value })
          }
        />
      </label>

      <label htmlFor="diplomes">
        <input
          type="text"
          placeholder="DIPLOMES"
          value={contact.diplomes}
          onChange={(e) => setContact({ ...contact, diplomes: e.target.value })}
        />
      </label>

      <label htmlFor="phone">
        <input
          type="text"
          placeholder="TELEPHONE"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
      </label>

      <label htmlFor="description">
        <textarea
          name="presentation"
          placeholder="PRESENTATION"
          value={contact.presentation}
          onChange={(e) =>
            setContact({ ...contact, presentation: e.target.value })
          }
        />
      </label>
    </div>
  );
}

export default ContactForm;
