import * as req from "supertest";
import Server from "@config/server";
import { PORT } from "@helpers/constants";
import Healthcheck from "@modules/healthcheck";

describe("Healthcheck", () => {
  let server: Server;

  beforeEach(async () => {
    server = new Server([new Healthcheck()], parseInt(<string>PORT));
  });

  it("Root path should return healthcheck message", async () => {
    const res = await req(server.app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Movie API is running...");
  });
});
