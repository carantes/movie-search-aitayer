import { CacheClient } from "@config/cache";

export const mockRequest = (params?: object) => {
  return {
    ...params,
  };
};

export const mockResponse = (params?: object) => {
  const res: any = {
    ...params,
  };
  res.header = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRedis = (data?: any): CacheClient => {
  return {
    getAsync: jest.fn(() => Promise.resolve(data && JSON.stringify(data))),
    setAsync: jest.fn(() => Promise.resolve("OK")),
    flushdbAsync: jest.fn(() => Promise.resolve("OK")),
  };
};

export const movies = {
  Search: [
    {
      Title: "The Avengers",
      Year: "2012",
      imdbID: "tt0848228",
      Type: "movie",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    },
  ],
  totalResults: "92",
  Response: "True",
};

export const result = [
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Title: "The Avengers",
    Type: "movie",
    Year: "2012",
    imdbID: "tt0848228",
  },
  {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Title: "The Avengers",
    Type: "movie",
    Year: "2012",
    imdbID: "tt0848228",
  },
];
