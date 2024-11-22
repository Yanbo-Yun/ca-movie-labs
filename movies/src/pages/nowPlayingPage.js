import React, { useContext } from "react";
import { useQuery } from "react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";  // 获取正在上映的电影数据
import PageTemplate from "../components/templateMovieListPage";  // 页面模板组件
import Spinner from "../components/spinner";  // 加载中组件
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";  // 图标组件
import { MoviesContext } from "../contexts/moviesContext";  // 上下文

const NowPlayingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery("nowPlayingMovies", getNowPlayingMovies);
  const { addToWatchlist } = useContext(MoviesContext);  // 使用上下文中的添加到观影清单的函数

  if (isLoading) {
    return <Spinner />;  // 加载中的组件
  }

  if (isError) {
    return <p>Error: {error.message}</p>;  // 错误提示
  }

  const movies = data?.results || [];  // 确保 `data.results` 存在并且是数组

  return (
    <PageTemplate
      title="Now Playing Movies"
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

export default NowPlayingMoviesPage;

