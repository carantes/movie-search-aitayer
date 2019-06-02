# Movie Search Assessment

You are asked to build a simple website that has a search box where a user will be able to search for movies by name and see the list of the results. The results will be fetched from an external API on the backend. The frontend & backend should be in the same repo for the sake of simplicity.

## Table of Contents

- [Running](#running)
- [Development](#development)
- [About the case study](#about-the-case-study)

## Running

### Requirements

- Node
- Docker
- Docker Compose

```bash
docker-compose up
```

The website will be available on:
<http://localhost:3000/>

## Development

### How this project is organized

```bash
movie-search-app/
  movie-api/
    src/
      config/
      helpers/
      middlewares/
      modules/
      app.ts
    Dockerfile
    package.json
    tsconfig.json
  movie-ui/
    public/
    src/
      Actions/
      Components/
      HOC/
      Pages/
      Reducers/
      Utils/
      App.js
      index.js
      store.js
    Dockerfile
    package.json
  README.md
  docker-compose.yml
```

### `Backend (movie-search-app > movie-api > src)`

| Path         | Description               |
| ------------ | ------------------------- |
| config/      | Server setup              |
| helpers/     | Helper functions          |
| middlewares/ | Middleware functions      |
| modules/     | Routes and Business logic |
| tests/       | Test utilities            |
| app.ts       | Server entrypoint         |

#### Installing

```sh
npm install
```

#### Redis

```sh
docker run --name redis -p 6379:6379 -d redis
```

#### Enviroment variables

```sh
PORT=8000 #server port
REDIS_HOST=localhost #redis host
REDIS_PORT=6379 #redis port
OMDB_API_KEY=a665ccb7&s #omdb api key
OMDB_API_URL=http://www.omdbapi.com/ #omdb api url
```

#### Running

```sh
npm start
```

<http://localhost:8000/>

#### Testing

```sh
npm tests
```

```sh
npm run coverage
```

#### Endpoints

```js
/api/search?keyword=avengers
```

- keyword `<String>`
- return a list of movies and status 200 (OK)

```js
/api/clear
```

- Clear all the cached data and return 200 (OK).

### `Frontend (movie-search-app > movie-ui)`

| Path        | Description                         |
| ----------- | ----------------------------------- |
| Actions/    | Redux actions                       |
| Components/ | Stateless components                |
| HOC/        | High ordered components (Behaviors) |
| Pages/      | Containers                          |
| Reducers/   | Redux data layer                    |
| Utils/      | Utils functions                     |
| App.js      | React app container                 |
| index.js    | Render                              |

#### Installing

```sh
npm install
```

#### Running

```sh
npm start
```

#### Testing

```sh
npm tests
```

```sh
npm run coverage
```

<http://localhost:3000/>

#### CRA

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## About the case study

### Time spent

I started doing this assessment on May 20 and believe have spent something around 30-40 hours of development.

### Production Ready issues

#### Frontend

- Eject CRA and bundle react app
- Create a Dockerfile using NGINX to deliver static files
- E2E tests
- Configure CI and Infra as code

#### Backend

- Typescript bundle
- Create a production Dockerfile
- Review any security issues
- Review logger levels
- Configure CI and Infra as code

### Next steps

- Routes (React Router)
- Atomic Design
- Templates/Themes
- StyledComponents
- Typescript
- Hooks
- SSR (server side rendering)
