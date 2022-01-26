import React, { useContext } from 'react';
import GlobalContext from '../../context/context';
import './Admin.css';

function NewsForm() {
  const { news, setNews } = useContext(GlobalContext);

  return (
    <div>
      <label htmlFor="title">
        {/* suivant le type selectionné on envoie les infos dans des state différents */}
        <input
          type="text"
          placeholder="TITRE"
          value={news.title}
          onChange={(e) => setNews({ ...news, title: e.target.value })}
        />
      </label>
      <label htmlFor="places">
        <input
          type="text"
          placeholder="LIEU"
          value={news.places}
          onChange={(e) => setNews({ ...news, places: e.target.value })}
        />
      </label>
      <section className="dates">
        <label htmlFor="date-first">
          DATE DE DEBUT :
          <input
            type="date"
            value={news.date_first}
            onChange={(e) => setNews({ ...news, date_first: e.target.value })}
          />
        </label>
        <label htmlFor="date-last">
          DATE DE FIN :
          <input
            type="date"
            value={news.date_last}
            onChange={(e) => setNews({ ...news, date_last: e.target.value })}
          />
        </label>
      </section>
      <label htmlFor="description">
        <textarea
          name="description"
          placeholder="DESCRIPTION"
          value={news.description}
          onChange={(e) => setNews({ ...news, description: e.target.value })}
        />
      </label>
    </div>
  );
}

export default NewsForm;
