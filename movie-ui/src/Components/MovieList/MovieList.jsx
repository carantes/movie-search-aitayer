import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Movie from "Components/Movie";
import styles from "./MovieList.module.css";

const MovieList = props => {
  const { movies } = props;

  if (movies.length === 0) {
    return <span>No movies to show.</span>;
  }

  return (
    <Fragment>
      <div className={styles.wrapper}>
        {movies.map(({ imdbID, Title, Poster }) => (
          <Movie key={imdbID} title={Title} poster={Poster} {...props} />
        ))}
      </div>
    </Fragment>
  );
};

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.array,
};

export default MovieList;
