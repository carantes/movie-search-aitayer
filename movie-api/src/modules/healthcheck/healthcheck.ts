import { Router, Request, Response } from "express";

class Healthcheck {
  public path = "/";
  public router = Router();

  constructor() {
    this.config();
  }

  private config(): void {
    this.router.get(this.path, this.getHealthcheck);
  }

  private getHealthcheck = (_: Request, res: Response) => {
    return res.status(200).send({
      message: "Movie API is running...",
    });
  };
}

export default Healthcheck;
