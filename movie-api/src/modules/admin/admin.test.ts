import * as req from "supertest";
import Server from "@config/server";
import { PORT } from "@helpers/constants";
import Admin from "@modules/admin";
import httpStatus from "@helpers/httpStatus";
import { mockRedis } from "@tests/mocks";

describe("Admin", () => {
  let server: Server;
  let redisClient;

  beforeEach(async () => {
    redisClient = mockRedis();
    server = new Server([new Admin(redisClient)], parseInt(<string>PORT));
  });

  it("Should invalidate cache when call clear", async () => {
    const res = await req(server.app).get("/api/clear");
    expect(redisClient.flushdbAsync).toBeCalled();
  });

  it("Should return OK message", async () => {
    const res = await req(server.app).get("/api/clear");
    expect(res.status).toBe(httpStatus.OK);
  });
});
