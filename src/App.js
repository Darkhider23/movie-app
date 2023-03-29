import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Moviepage from './components/movie-page/movie-page';
import logo from './assets/logo.png'
function App() {
  const [moviedata, setmovieData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleOnSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleOnSearchSubmit = (event) => {
    if (event.keyCode === 13) {
      const options = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/find',
        params: { q: searchQuery },
        headers: {
          'X-RapidAPI-Key': 'a8003c93e5mshcd18d73914e323dp1cb017jsn34c9d2a8d394',
          'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
      };


      axios.request(options).then(async (response) => {

        const movdata = await response.data.results;
        console.log(movdata);
        movdata.map((data, index) => (
          (index === 0) ?
            setmovieData(data)
            :
            null
        ))
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
  return (
    <div>
      <div className='searchBar'>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Movies Holmes</h1>
        </div>
        <div className='inputbutton'>
          <input type="text" value={searchQuery} onChange={handleOnSearchChange} onKeyDown={handleOnSearchSubmit} />
          <button onClick={handleOnSearchChange} type='submit'>Search</button>
        </div>
      </div>
      {moviedata && <Moviepage data={moviedata} />}
    </div>

  );
}

export default App;
