import './App.css';
import React, { useState } from 'react';

function App() {
  const [apiResult, setResults] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setLoading] = useState(false);

  const getResults = async () => {
    setLoading(true);
    let url;
    if (process.env.API_URI) {
      url = `${process.env.API_URI}/results/${inputValue}`;
    } else {
      url = `/results/${inputValue}`;
    }
    const res = await fetch(url);
    const json = await res.json();
    setResults(json);
    setLoading(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <header className="input-fields">
        <input type="text" value={inputValue} onChange={handleInputChange} pattern="[0-9]{5}" placeholder="Enter your zip code" title="Five digit zip code" />
        <button type="button" onClick={getResults}>Search</button>
      </header>

      <section>
        {isLoading
          && <p className="loader">Loading...</p>}

        {apiResult
          && (
            <main className="grid">
              {apiResult.map((document) => (
                <div className="card" key={document.id}>
                  <p>{document.marketname}</p>
                  <p>{document.yearly_schedule}</p>
                  <p>{document.weekly_schedule}</p>
                </div>
              ))}
            </main>
          )}
      </section>
    </div>
  );
}

export default App;
