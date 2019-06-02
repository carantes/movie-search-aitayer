import * as req from "supertest";
import * as nock from "nock";
import Server from "@config/server";
import { PORT, OMDB_API_KEY, OMDB_API_URL } from "@helpers/constants";
import httpStatus from "@helpers/httpStatus";
import Movie from "@modules/movie";
import { movies, result } from "@tests/mocks";

describe("Movie", () => {
  let server: Server;

  beforeEach(async () => {
    server = new Server([new Movie()], parseInt(<string>PORT));
  });

  it("Search for movies should return a list", async () => {
    nock(OMDB_API_URL)
      .get("/")
      .query({ apikey: OMDB_API_KEY, s: "avengers", page: 1 })
      .reply(200, movies);

    nock(OMDB_API_URL)
      .get("/")
      .query({ apikey: OMDB_API_KEY, s: "avengers", page: 2 })
      .reply(200, movies);

    const res = await req(server.app).get("/api/search?keyword=avengers");
    expect(res.status).toBe(httpStatus.OK);
    expect(res.body).toEqual(result);
  });

  it("Invalid search should return validation error", async () => {
    const res = await req(server.app).get("/api/search");
    expect(res.status).toBe(httpStatus.BadRequest);
  });
});
