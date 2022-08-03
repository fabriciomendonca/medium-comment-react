# Medium comment

This is a React + Redux app that uses the Javascript Range API to implements a simple version of the Medium's text highlight and comment feature.

See the real deal
https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f

Demo
https://boiling-beach-42579.herokuapp.com/

The API is served from a Heroku hosted NodedJS + Express + MongoDB RESTFul API.

Back end project
https://github.com/fabriciomendonca/medium-comment-api

## Installation

You will need [NodeJS](https://nodejs.org/). 
Version used in this project: 6.9.2

```
git clone https://github.com/fabriciomendonca/medium-comment-react.git
cd medium-comment-react
npm install
```

## Running scripts

### Start

A static express server with history api fallback used for deploy on heroku.

```
npm start
```

### Build

Creates the deployment folder and production files (/dist).

```
npm run build
```

### Development server

Runs a local development server with webpack-dev-server.

#### Remote API

Uses the remote API hosted on Heroku

```
npm run serve:dev
```

#### Local API

Uses the API served from localhost. [See the porject](https://github.com/fabriciomendonca/medium-comment-api)

```
npm run local:dev
```

### Testing

#### Run the tests

Runs the tests using jest.

```
npm test
```

#### Watch the tests (Remote API)

Watches the tests while creating them.

##### Remote API

```
npm run test:watch
```

##### Local API

```
npm run local:test:watch
```

