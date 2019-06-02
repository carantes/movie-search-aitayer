import React from "react";
import { shallow } from "enzyme";
import Search from "./Search";

describe("Search", () => {
  const waittime = 1;
  let stub = jest.fn();
  let search;

  beforeEach(() => {
    search = shallow(<Search onSearch={stub} waitInterval={waittime} />);
  });

  it("should render properly", () => {
    expect(search.exists()).toBe(true);
  });
});
