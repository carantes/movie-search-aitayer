import * as req from "supertest";
import server from "../../config/server";

test("[GET] /", async () => {
  const res = await req(server).get("/");
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Movie API is running...");
});
