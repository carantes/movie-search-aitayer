import React from "react";
import { mount } from "enzyme";
import withHandleSearch from "./withHandleSearch";

describe("Search", () => {
  const waittime = 1;
  let stub = jest.fn();
  let search;

  beforeEach(() => {
    const HOC = withHandleSearch(props => <input {...props} />);
    search = mount(<HOC onSearch={stub} waitInterval={waittime} />);
  });

  it("should render properly", () => {
    expect(search).toMatchSnapshot();
  });

  it("should do nothing before type 3 characters", done => {
    const input = search.find("input").at(0);
    input.instance().value = "ah";
    input.simulate("change");

    setTimeout(() => {
      expect(stub.mock.calls.length).toBe(0);
      done();
    }, waittime);
  });

  it("should callback search function after type 3 characters", done => {
    const input = search.find("input").at(0);
    input.instance().value = "foo";
    input.simulate("change");

    setTimeout(() => {
      expect(stub).toHaveBeenCalled();
      done();
    }, waittime);
  });

  it("should respect waittime", function() {
    jest.useFakeTimers();
    search.find("input").simulate("change", { target: { value: "Foo" } });
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), waittime);
    jest.useRealTimers();
  });
});
