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
The Cloud Natural Language API uses ADC credentials, in order to authenticate to the API you need to enable the API in your project and follow the [instructions](https://cloud.google.com/docs/authentication/provide-credentials-adc#local-dev) 

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

## CI

Every push to main will trigger the CI pipeline to build and publish a Docker image with the dev tag to my public [Docker Hub](https://hub.docker.com/r/rubsdevs/sentiment-analyzer/) and there’s also a way to tag the image for a different environment, if a tag called `qa-*` is pushed the image will be tagged as qa. This is only to demonstrate how we could publish different versions of the image.
