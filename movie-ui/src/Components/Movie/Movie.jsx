import React from "react";
import PropTypes from "prop-types";

const Movie = ({ title, poster }) => (
  <div>
    <img src={poster} alt={title} width={"100%"} />
    <p>{title}</p>
  </div>
);

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};

export default Movie;
