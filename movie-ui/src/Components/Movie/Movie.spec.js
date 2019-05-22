import React from "react";
import { shallow } from "enzyme";
import Movie from "./Movie";
import { mocks } from "Utils";

const { Title, Poster } = mocks.movies[0];

describe("Movie", () => {
  let movie;

  beforeEach(() => {
    movie = shallow(<Movie title={Title} poster={Poster} />);
  });

  it("should render properly", () => {
    expect(movie.exists()).toBe(true);
  });

  it("should return a title", () => {
    expect(movie.find("p").text()).toEqual(Title);
  });

  it("should return a image", () => {
    expect(movie.find("img").prop("src")).toEqual(Poster);
  });
});
