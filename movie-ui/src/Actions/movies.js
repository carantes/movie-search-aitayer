import { REQUEST_MOVIES, RECEIVE_MOVIES, RECEIVE_ERROR } from "./types";
import { fetchHelper } from "Utils";

function requestMovies(keyword) {
  return {
    type: REQUEST_MOVIES,
    payload: keyword,
    loading: true,
  };
}

function receiveMovies(movies, keyword) {
  return {
    type: RECEIVE_MOVIES,
    movies,
    keyword: keyword,
    receivedAt: Date.now(),
    loading: false,
  };
}

function receiveError(err) {
  return {
    type: RECEIVE_ERROR,
    error: err,
    receivedAt: Date.now(),
    loading: false,
  };
}

function parseData(movies) {
  return movies.filter(result => result !== null);
}

export function fetchGetMovies(keyword) {
  return async dispatch => {
    dispatch(requestMovies(keyword));

    return await fetchHelper(`api/search?keyword=${keyword}`)
      .then(parseData)
      .then(movies => dispatch(receiveMovies(movies, keyword)))
      .catch(err => dispatch(receiveError(err)));
  };
}
