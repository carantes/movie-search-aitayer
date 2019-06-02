import React from "react";
import { shallow } from "enzyme";
import { Home } from "./Home";

describe("Home", () => {
  let home;

  beforeEach(() => {
    const dummy = () => {};
    home = shallow(<Home getMovies={dummy} />);
  });

  it("should render properly", () => {
    expect(home).toMatchSnapshot();
  });
});
