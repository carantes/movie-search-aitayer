import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import { fetchGetMovies } from "./movies";
import { mocks } from "Utils";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Movies Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("fetch get movies", async () => {
    nock("http://localhost")
      .get("/api/search")
      .query({ keyword: "avengers" })
      .reply(200, mocks.movies); // Mock reponse code and data

    await store.dispatch(fetchGetMovies("avengers"));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("fetch with error", async () => {
    nock("http://localhost")
      .get("/api/search")
      .reply(400); // Mock reponse code and data

    await store.dispatch(fetchGetMovies());
    expect(store.getActions()).toMatchSnapshot();
  });
});
