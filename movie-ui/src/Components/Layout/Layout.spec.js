import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout";

const { Wrapper, Header, Main } = Layout;

describe("Layout", () => {
  it("Wrapper should render properly", () => {
    const wrapper = shallow(<Wrapper>foo</Wrapper>);
    expect(wrapper.text()).toBe("foo");
  });

  it("Header should render properly", () => {
    const header = shallow(<Header title="bar">foo</Header>);
    expect(header.find("h1").text()).toBe("bar");
    expect(header.text()).toBe("barfoo");
  });

  it("Main should render properly", () => {
    const detail = shallow(<Main>foo</Main>);
    expect(detail.text()).toBe("foo");
  });
});
