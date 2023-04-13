import React, { useState } from 'react';
import './App.css';

interface IProduct {
  id: string,
  title: string,      // Description
  thumbnail: string,  // Photo
  domain_id: string,  // Category
  price: number,      // Price
  permalink: string   // Store Link 
}

function App() {
  const [web, setWeb] = useState('All');
  const [category, setCategory] = useState('Geladeira');
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([] as IProduct[]);

  function fetchProducts() {
    const url = `http://localhost:3001/${web}/${category}`;
    fetch(query ? `${url}?q=${query}` : url)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }

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
          <button type='button' onClick={fetchProducts}>Search</button>
        </header>
      </div>
      <div className="App-results">
        { products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.title}</h2>
            <img src={product.thumbnail} alt={`${product.id} photo`} />
            <h4>Category: {product.domain_id}</h4>
            <p><b>Price: R${product.price.toFixed(2)}</b></p>
            <a href={product.permalink} target='_blank' rel="noreferrer">Buy Here</a>
          </div>
        )) }
      </div>
    </div>
  );
}

export default App;
