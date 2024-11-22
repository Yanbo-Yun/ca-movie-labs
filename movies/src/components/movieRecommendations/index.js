import React from "react";
import { useQuery } from "react-query";
import { getMovieRecommendations } from "../../api/tmdb-api"; 
import Spinner from "../spinner";

const MovieRecommendations = ({ movieId }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["recommendations", { id: movieId }],
    getMovieRecommendations
  );

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>Recommended Movies</h3>
      <ul>
        {data.results.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieRecommendations;
