import React, { Component } from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import withMovies from "./withMovies";
import { mocks } from "Utils";

const mockStore = configureStore();
const { movies } = mocks;
const initialState = { movies, loading: false, lastRequest: null };
const store = mockStore(initialState);

describe("withMovies", () => {
  let wrapped;

  beforeEach(() => {
    const HOC = withMovies(Component);
    wrapped = shallow(<HOC store={store} />);
  });

  it("should render properly", () => {
    expect(wrapped.exists()).toBe(true);
  });

  // TODO: Testar se esta passando a prop movie para do HOC para o componente
  // it("should pass movie prop from state", () => {
  //   console.log(wrapped.children().props());
  //   expect(wrapped.children().props().movies).toBe(movies);
  // });
});
