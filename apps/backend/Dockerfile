FROM node:20-slim AS base
ARG PORT

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update -y && apt-get install -y openssl

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm api build
RUN pnpm api deploy --prod /backend

FROM base AS backend
COPY --from=build /backend /srv/backend
WORKDIR /srv/backend

EXPOSE ${PORT}
