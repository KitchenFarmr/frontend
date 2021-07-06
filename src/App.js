import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [apiResult, setResults] = useState(null);
  useEffect(()=>{
    const getResults = async () => {
      const res = await fetch('http://localhost:5000/results');
      const json = await res.json();
      setResults(json.results);
    }
    getResults();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Results:
        </p>
        {apiResult
          ? <ul>
              {apiResult.map((document) => {
                return <li key={document.id}>{document.marketname}</li>
              })}
            </ul>
          : <p>Loading...</p>
        }

      </header>
    </div>
  );
}

export default App;
