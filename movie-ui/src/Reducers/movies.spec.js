import movies from "./movies";
import { initialState } from "./movies";
import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES,
  RECEIVE_ERROR,
} from "../Actions/types";

describe("Movies reducer", () => {
  it("should return the initial state", () => {
    expect(movies(undefined, {})).toMatchSnapshot();
  });

  it("should handle REQUEST_MOVIES", () => {
    expect(
      movies(initialState, {
        type: REQUEST_MOVIES,
      }),
    ).toMatchSnapshot();
  });

  it("should handle RECEIVE_MOVIES", () => {
    expect(
      movies(initialState, {
        type: RECEIVE_MOVIES,
      }),
    ).toMatchSnapshot();
  });

  it("should handle RECEIVE_ERROR", () => {
    expect(
      movies(initialState, {
        type: RECEIVE_ERROR,
      }),
    ).toMatchSnapshot();
  });
});
