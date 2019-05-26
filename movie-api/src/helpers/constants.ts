import * as dotenv from "dotenv";
dotenv.config();

export const {
  PORT = 3000,
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
} = process.env;
