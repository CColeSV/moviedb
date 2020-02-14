import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

import axios from 'axios';

function App() {
  const [state, setState ] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiURL = "http://www.omdbapi.com/?apikey=d8b757e";

  const search = e => {
    if(e.key === 'Enter'){
      axios(apiURL + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        });
        console.log(data);
      })
    }
  }

  const handleInput = e => {
    let s = e.target.value;

    setState((prevState) => (
      {
        ...prevState, s: s
      }
    ))

    console.log(state.s);
  }

  const openPopup = id => {
    axios(apiURL + "&i=" + id).then(({ data }) => {
      let result = data;
      console.log("result", result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    })
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {}}
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup}/>

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
