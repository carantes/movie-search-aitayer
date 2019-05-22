import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout";

const { Wrapper, Header, Detail } = Layout;

describe("Layout", () => {
  it("Wrapper should render properly", () => {
    const wrapper = shallow(<Wrapper>foo</Wrapper>);
    expect(wrapper.exists()).toBe(true);
  });

  it("Header should render properly", () => {
    const header = shallow(<Header>foo</Header>);
    expect(header.exists()).toBe(true);
  });

  it("Detail should render properly", () => {
    const detail = shallow(<Detail>foo</Detail>);
    expect(detail.exists()).toBe(true);
  });
});
