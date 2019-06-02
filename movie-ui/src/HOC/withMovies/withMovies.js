import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGetMovies } from "Actions/movies";

const withMovies = WrappedComponent => {
  class With extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const moviesSelector = ({ movies }) => ({
    loading: movies.loading,
    movies: movies.movies,
  });

  const moviesActions = dispatch => ({
    getMovies(keyword) {
      return dispatch(fetchGetMovies(keyword));
    },
  });

  return connect(
    moviesSelector,
    moviesActions,
  )(With);
};

export default withMovies;
