import * as dotenv from "dotenv";
dotenv.config();

export const {
  PORT = 3000,
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  OMDB_API_KEY = "a665ccb7",
  OMDB_API_URL = "http://www.omdbapi.com/",
} = process.env;
