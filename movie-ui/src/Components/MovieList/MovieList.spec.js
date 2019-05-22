import React from "react";
import { shallow } from "enzyme";
import MovieList from "./MovieList";
import { mocks } from "Utils";

const { movies } = mocks;

describe("MovieList", () => {
  let movieList;

  it("initial state without data", () => {
    movieList = shallow(<MovieList movies={[]} />);
    expect(movieList.find("span").text()).toBe("No movies to show.");
  });

  describe("after load movies", () => {
    beforeEach(() => {
      movieList = shallow(<MovieList movies={movies} />);
    });

    it("should render properly", () => {
      expect(movieList.exists()).toBe(true);
    });

    it("should show a message", () => {
      expect(movieList.find("Movie").length).toBe(movies.length);
    });
  });
});
