# Fullstack marketing application

This repository uses [pnpm](https://pnpm.io), [workspaces](https://pnpm.io/workspaces) and contains two application:

- [Frontend SPA](https://github.com/slava-insomniac/marketing-app/tree/main/apps/frontend)
- [Backend API](https://github.com/slava-insomniac/marketing-app/tree/main/apps/backend)

Each package has a short workspace alias:

- `pnpm web` — frontend app
- `pnpm api` — backend app

## Setup

Install the dependencies.

```sh
pnpm install
```

Create your `.env` file inside `apps/backend` and modify the environment variables (if needed).

```sh
cp apps/backend/.env.sample apps/backend/.env
```

Start Postgres Docker container.
Make sure you have started the Docker daemon before.

```sh
pnpm api db:up
```

Finally, migrate app tables.

```sh
pnpm api db:push
```

## Local develop

Start backend dev server.

```sh
pnpm api dev
```

Start frontend dev server.

```sh
pnpm web dev
```

## Code quality

Check IDE settings.

```sh
pnpm editorconfig
```

Run lint.

```sh
pnpm lint
```

Run tests.

```sh
pnpm test
```

## Production

Buld backend.

```sh
pnpm api docker:build
```

Start backend and database containers.

```sh
pnpm api docker:up
```

Migrate database.

```sh
pnpm api db:push
```

Build client container.

```sh
pnpm web docker:build
```

Start container with nginx.

```sh
pnpm web docker:up
```

## Requirements

- pnpm
- Docker
- Node (>=18.0.0)

## About

[GitHub Repository](https://github.com/KosyanMedia/test-tasks/tree/master/marketing)
