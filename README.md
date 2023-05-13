# Sentiment Analyzer API

## Description

API to analyze the sentiment of a text using the [GCP Cloud Natural Language API](https://cloud.google.com/natural-language/docs).

## Dependencies

This API requires a local installation of MongoDB. The easiest ways to get it up and running is using Docker

### Using Docker

You will need to have [Docker Desktop](https://docs.docker.com/get-docker/) installed and running.
There is a `docker-compose.yml` file that will start a container for MongoDB.
Having Docker installed just run:

```
docker compose up -d
```

## Install

```bash
$ npm install
```

## Running the app

Rename the `.env.sample` to `.env` and replace variable values with relevant local values.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

The API is documented using [Swagger](https://docs.nestjs.com/openapi/introduction). You can view the API docs when running the project locally by going to http://localhost:3000/docs.
