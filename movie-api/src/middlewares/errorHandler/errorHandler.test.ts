import httpStatus from "@helpers/httpStatus";
import errorHandler from "./errorHandler";
import { mockRequest, mockResponse } from "../../tests/mocks";

describe("Error Handler", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = jest.fn(() => console.log("next"));
  });

  it("Should throw an error", () => {
    errorHandler(new Error("Crash Test"), req, res, next);
    expect(res.status).toHaveBeenCalledWith(httpStatus.ServerError);
  });

  it("Should not return to controller", () => {
    errorHandler(new Error("Crash Test"), req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
