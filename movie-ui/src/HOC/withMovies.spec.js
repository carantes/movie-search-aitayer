import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import nock from "nock";
import withMovies from "./withMovies";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { mocks } from "Utils";

const mockStore = configureStore([thunk]);
const initialState = {
  movies: {
    movies: [],
    loading: false,
  },
};
const store = mockStore(initialState);

describe("withMovies HOC", () => {
  let wrapped;

  beforeEach(() => {
    let dummy = () => <div />;
    const HOC = withMovies(dummy);
    wrapped = mount(
      <Provider store={store}>
        <HOC />
      </Provider>,
    );
  });

  it("should render properly", () => {
    expect(wrapped).toMatchSnapshot();
  });

  it("should pass getMovie prop to children", () => {
    expect(
      wrapped
        .children()
        .children()
        .props().getMovies,
    ).toBeInstanceOf(Function);
  });

  it("should pass an empty movies list prop to children", () => {
    expect(
      wrapped
        .children()
        .children()
        .props().movies,
    ).toEqual(initialState.movies.movies);
  });

  it("should send loading prop to children", () => {
    expect(
      wrapped
        .children()
        .children()
        .props().loading,
    ).toEqual(initialState.movies.loading);
  });

  // Actions
  it("should dispatch fetchCategories action", async () => {
    nock("http://localhost")
      .get("/api/search")
      .query({ keyword: "avengers" })
      .reply(200, mocks.movies);

    await wrapped
      .children()
      .children()
      .props()
      .getMovies("avengers");

    expect(store.getActions()).toMatchSnapshot();

    nock.cleanAll();
  });
});
