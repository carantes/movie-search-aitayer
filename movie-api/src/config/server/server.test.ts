import * as req from "supertest";
import Server from "./server";

describe("Server", () => {
  let server;

  it("Should start a server with port", async () => {
    const port = 8888;
    server = new Server([], port);
    server.app.listen = jest.fn();
    await server.listen();
    expect(server.app.listen).toBeCalled();
  });
});
