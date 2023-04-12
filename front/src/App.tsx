import React, { useState } from 'react';
import './App.css';

function App() {
  const [web, setWeb] = useState('All');
  const [category, setCategory] = useState('Geladeira');
  const [query, setQuery] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Search Engine</h1>
      </header>
      <div className="App-main">
        <header className="Search-bar">
          <label htmlFor="web">
            <select 
              name="web"
              id="web"
              value={web}
              onChange={ ( {target} ) => setWeb(target.value) }
            >
              <option value="All">All</option>
              <option value="MercadoLivre">Mercado Livre</option>
              <option value="Buscape">Buscapé</option>
            </select>
          </label>
          <label htmlFor="category">
            <select
              name="category"
              id="category"
              value={category}
              onChange={ ( {target} ) => setCategory(target.value) }
            >
              <option value="Geladeira">Geladeira</option>
              <option value="TV">TV</option>
              <option value="Celular">Celular</option>
            </select>
          </label>
          <label htmlFor="query">
            <input
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={ ({ target }) => setQuery(target.value) }
            />
          </label>
          <button type='button' onClick={() => console.log(web, category, query)}>Search</button>
        </header>
      </div>
      <div className="App-results">
        
      </div>
    </div>
  );
}

export default App;
