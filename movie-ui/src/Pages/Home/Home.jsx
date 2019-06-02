import React from "react";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";
import { Layout, Search, MovieList } from "Components";
import { withMovies } from "HOC";
import { WAIT_INTERVAL, TYPE_COUNT } from "Utils";

const { Wrapper, Header, Main } = Layout;

export const Home = ({ movies, loading, getMovies }) => (
  <Wrapper>
    <Header title="Movie Search">
      <Search
        onSearch={keyword => getMovies(keyword)}
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

Home.defaultProps = {
  movies: [],
  loading: false,
};

Home.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.array,
  loading: PropTypes.bool,
};

export default withMovies(Home);
