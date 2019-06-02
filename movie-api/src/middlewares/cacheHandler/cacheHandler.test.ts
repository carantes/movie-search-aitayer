import CacheHandler from "./cacheHandler";
import {
  mockRequest,
  mockResponse,
  mockRedis,
  result,
} from "../../tests/mocks";

describe("Cache Handler", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = mockRequest({ originalUrl: "bar" });
    res = mockResponse();
    next = jest.fn(() => console.log("next"));
  });

  it("Should search for key on cache", async () => {
    const client = mockRedis(result);
    const cacheHandler = CacheHandler(client);
    await cacheHandler(req, res, next);
    expect(client.getAsync).toBeCalledWith(req.originalUrl);
  });

  it("Should read from cache if key exist", async () => {
    const client = mockRedis(result);
    const cacheHandler = CacheHandler(client);
    await cacheHandler(req, res, next);
    expect(res.send).toBeCalledWith(result);
  });

  it("Should save cache if key dont exist", async () => {
    const client = mockRedis();
    const cacheHandler = CacheHandler(client);
    await cacheHandler(req, res, next);
    res.send(JSON.stringify({ bar: "foo" })); //Simulate call from controller
    expect(client.setAsync).toBeCalledWith("bar", '{"bar":"foo"}');
  });

  it("Should not save cache if controller return an error ", async () => {
    const client = mockRedis();
    const cacheHandler = CacheHandler(client);
    await cacheHandler(req, res, next);
    res.send(JSON.stringify({ errors: { message: "error found" } })); //Simulate call from controller
    expect(client.setAsync).not.toHaveBeenCalled();
  });

  it("Should return to controller if key dont exist", async () => {
    const client = mockRedis();
    const cacheHandler = CacheHandler(client);
    await cacheHandler(req, res, next);
    expect(next).toBeCalled();
  });
});
