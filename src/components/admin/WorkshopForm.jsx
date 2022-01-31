import React, { useContext } from 'react';
import GlobalContext from '../../context/context';
import './Admin.css';

function WorkshopForm() {
  const { event, setEvent } = useContext(GlobalContext);

  return (
    <div>
      <label htmlFor="title">
        <input
          type="text"
          placeholder="TITRE"
          value={event.title}
          onChange={(e) => setEvent({ ...event, title: e.target.value })}
        />
      </label>

      <label htmlFor="places">
        <input
          type="text"
          placeholder="LIEU"
          value={event.places}
          onChange={(e) => setEvent({ ...event, places: e.target.value })}
        />
      </label>

      <label htmlFor="description">
        <textarea
          name="description"
          placeholder="DESCRIPTION"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </label>
    </div>
  );
}

export default WorkshopForm;
