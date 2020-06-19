# blood-pressure

- [Getting Started](#getting-started)
  - [Environment Configuration](#environment-configuration)
  - [Running](#running)
  - [Building](#building)
  - [Deploying](#deploying)
- [Testing](#testing)
- [Linting](#linting)
- [Architecture](#architecture)
  - [Routing](#routing)
  - [State Management](#state-management)

A Vue app build from the Vue CLI for tracking and visualizing blood pressure readings over time. The app is powered by [Firebase](https://firebase.google.com/) and available at [blood-pressure-prod.web.app](https://blood-pressure-prod.web.app).

Authentication is handled through [Firebase Auth](https://firebase.google.com/docs/auth/) and is open for your own usage. There is not any obfuscation of data happening, however, so if you're worried about prying eyes, maybe use a disposable email address service like [Guerrilla Mail](https://www.guerrillamail.com/). Or see below for configuring to your own Firebase project.

## Getting Started

```sh
npm install
```

### Environment Configuration

The project will not run without first setting certain environment variables via the CLI or a `.env` file. This command runs [`./scripts/build-env.js`](./scripts/build-env.js) via Node to set environment variables to the app using [dotenv](https://www.npmjs.com/package/dotenv).

```sh
npm run build:env
```

#### Required Environment Variables

*Note: These environment variables currently match Firebase's app [config object](https://firebase.google.com/docs/web/setup?authuser=0#config-object).*

- `apiKey`: A Firebase project's API key
- `authDomain`: The Firebase project's authentication domain
- `databaseURL`: The Firebase project's database URL
- `projectId`: The Firebase project ID
- `appId`: Firebase web-based app ID
- `measurementId`: Associate the Firebase app with a Google Analytics property

### Running

*Note: Environment configuration is built before each `serve` command.*

```sh
npm run serve
```

### Building

*Note: Environment configuration is built before each `build` command.*

```sh
npm run build:app
```

### Deploying

The app is configured for deployment to Firebase; its hosting, database, and user authentication is run through the platform.

#### Hosting

```sh
npm run deploy:hosting
```

#### Database

Firebase's [Cloud Firestore](https://firebase.google.com/docs/firestore/) is used for the database. Security rules are located at [`./firestore.rules`](./firestore.rules) and are set to limit user access to owned data only.

```sh
npm run deploy:database
```

## Testing

Unit tests and mocks are created with [Jest](https://jestjs.io/) and use Vue's [Test Utils](https://vue-test-utils.vuejs.org/) library for simplification.

```sh
npm run test:unit
```

To run a single suite:

```sh
npm run test:unit -- SUITE_NAME
```

### VS Code Configuration

For debugging in VS Code, use the following configuration in `launch.json`:

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "vuejs: chrome",
  "url": "http://localhost:8080",
  "webRoot": "${workspaceFolder}/src",
  "breakOnLoad": true,
  "sourceMapPathOverrides": {
    "webpack:///./src/*": "${webRoot}/*",
    "webpack:///src/*": "${webRoot}/*",
    "webpack:///*": "*",
    "webpack:///./~/*": "${webRoot}/node_modules/*"
  }
}
```

## Linting

Linting follow Vue CLI's prescribed rules as well as [Prettier](https://prettier.io/) with a touch of personal customizations on top.

```sh
npm run lint
```

## Architecture

The app is build with TypeScript and classes using [`vue-class-component`](https://github.com/vuejs/vue-class-component) and [`vue-property-decorator`](https://github.com/kaorun343/vue-property-decorator). The intent was compare against Angular's style of component architecture.

Looking back, it might make more sense to stick to the object-based format that the Vue docs lead with. This approach involved a steeper, less documented learning curve.

### Routing

Routing is implemented with [Vue's official Router](https://router.vuejs.org/) and is configured at [`./src/router/index.ts`](./src/router/index.ts). The state's mutation and action types are located at [`./src/router/types.ts`](./src/router/types.ts).

### State Management

State is managed using [Vuex](https://vuex.vuejs.org/) and is set up at [`./src/store/index.ts`](./store/index.ts).  Vuex is a bit of overkill for this app, but it was interesting to compare to Angular's [NGRX](https://ngrx.io/).
