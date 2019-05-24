import React from "react";
import { ClipLoader } from "react-spinners";
import { Layout, Search, MovieList } from "Components";
import { withMovies } from "HOC";
import { WAIT_INTERVAL, TYPE_COUNT } from "Utils";

const Home = ({ movies, loading, getMovies }) => {
  const handleSearch = keyword => getMovies(keyword);
  const { Wrapper, Header, Main } = Layout;

  return (
    <Wrapper>
      <Header title="Movie Search">
        <Search
          onSearch={handleSearch}
          startWith={TYPE_COUNT}
          waitInterval={WAIT_INTERVAL}
        />
      </Header>
      <Main>
        <ClipLoader loading={loading} />
        <MovieList movies={movies} />
      </Main>
    </Wrapper>
  );
};

export default withMovies(Home);
