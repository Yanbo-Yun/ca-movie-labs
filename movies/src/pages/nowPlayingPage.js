// src/pages/nowPlayingPage.js

import React, { useState, useEffect } from "react";
import MovieList from "../components/movieList";
import Spinner from "../components/spinner";
import { getNowPlayingMovies } from "../api/tmdb-api";

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNowPlayingMovies()
      .then((movies) => {
        setMovies(movies);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return <MovieList movies={movies} />;
};

export default NowPlayingPage;
