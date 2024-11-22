import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";  // 获取流行电影数据
import PageTemplate from "../components/templateMovieListPage";  // 页模板组件
import Spinner from "../components/spinner";  // 加载中组件
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";  // 图标组件
import { MoviesContext } from "../contexts/moviesContext";  // 上下文

const PopularMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("popularMovies", getPopularMovies);
  const { addToWatchlist } = useContext(MoviesContext);  // 使用上下文中的添加到观影清单的函数

  if (isLoading) {
    return <Spinner />;  // 加载中的组件
  }

  if (isError) {
    return <p>Error: {error.message}</p>;  // 错误提示
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon
          onClick={() => addToWatchlist(movie)}  // 点击添加到观影清单
          sx={{ cursor: "pointer", fontSize: 30, color: "blue" }}
        />
      )}
    />
  );
};

export default PopularMoviesPage;


