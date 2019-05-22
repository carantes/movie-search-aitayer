import React from "react";
import { ClipLoader } from "react-spinners";
import { Layout, Search, MovieList } from "Components";
import { withMovies } from "HOC";
import { WAIT_INTERVAL, TYPE_COUNT } from "Utils";

const Home = ({ movies, loading, getMovies }) => {
  const handleSearch = keyword => getMovies(keyword);
  const { Wrapper, Header, Detail } = Layout;

  return (
    <Wrapper>
      <Header>
        <h1>Movie Search</h1>
        <Search
          onSearch={handleSearch}
          startWith={TYPE_COUNT}
          waitInterval={WAIT_INTERVAL}
        />
      </Header>
      <Detail>
        <ClipLoader loading={loading} />
        <MovieList movies={movies} />
      </Detail>
    </Wrapper>
  );
};

export default withMovies(Home);
