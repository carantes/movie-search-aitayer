import React from "react";
import { shallow } from "enzyme";
import Home from "./Home";

describe("Home", () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it("should render properly", () => {
    expect(home).toMatchSnapshot();
  });
});
