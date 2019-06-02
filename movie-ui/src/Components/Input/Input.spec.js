import React from "react";
import { shallow } from "enzyme";
import Input from "./Input";

describe("Layout", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Input placeholder={"foo"} />);
  });

  it("should render properly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have a placeholder", () => {
    expect(wrapper.find("input").prop("placeholder")).toEqual("foo");
  });
});
