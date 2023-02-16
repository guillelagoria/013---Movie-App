import { useEffect, useState } from "react";
import "./App.css";

import React from "react";

export const App = () => {
  const [search, setSearch] = useState("");
  const [allMovies, setAllMovies] = useState(
    new Array(20).fill({
      title: "",
      poster_path: "",
      vote_average: "",
      overview: "",
    })
  );

  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  };

  const showMovies = (movies) => {
    const newArray = [];
    movies.forEach((movie) => {
      const newObj = {
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        overview: movie.overview,
      };
      newArray.push(newObj);
    });
    setAllMovies(newArray);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchMovie();
    }
  };

  const searchMovie = () => {
    if (search && search !== "") {
      getMovies(SEARCH_API + search);
    }
  };

  const landingPage = () => {
    getMovies(API_URL);
  };

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  return (
    <>
      <body>
        <header>
          <form className="form-wrapper">
            <button className="landing" onSubmit={landingPage}>
              Home
            </button>
            <input
              type="text"
              className="search"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </form>
        </header>
        <main>
          {allMovies.map((none, i) => (
            <div className="movie" key={i}>
              <img
                src={IMG_PATH + allMovies[i].poster_path}
                alt={allMovies[i].title}
              />
              <div className="movie-info">
                <h3>{allMovies[i].title}</h3>
                <span className={getClassByRate(allMovies[i].vote_average)}>
                  {allMovies[i].vote_average}
                </span>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                {allMovies[i].overview}
              </div>
            </div>
          ))}
        </main>
      </body>
    </>
  );
};

export default App;
