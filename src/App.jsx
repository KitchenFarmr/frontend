import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [apiResult, setResults] = useState(null);
  useEffect(() => {
    const getResults = async () => {
      const res = await fetch(process.env.API_URI);
      const json = await res.json();
      setResults(json.results);
    };
    getResults();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Results:
        </p>
        {apiResult
          ? (
            <ul>
              {apiResult.map((document) => <li key={document.id}>{document.marketname}</li>)}
            </ul>
          )
          : <p>Loading...</p>}

      </header>
    </div>
  );
}

export default App;
