import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  RECEIVE_ERROR,
} from "../Actions/types";

const initialState = {
  loading: false,
  movies: [],
  error: null,
};

function movies(state = initialState, action) {
  const { type, payload, loading, movies, receivedAt, error } = action;
  switch (type) {
    case REQUEST_MOVIES:
      return {
        payload,
        loading,
      };
    case RECEIVE_MOVIES:
      return {
        payload,
        movies,
        receivedAt,
        loading,
      };
    case RECEIVE_ERROR:
      return {
        error,
        receivedAt,
        loading,
      };
    default:
      break;
  }
  return state;
}

export default movies;
