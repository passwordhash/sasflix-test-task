FROM node:22.2 AS base

# Значение по умолчанию
ARG NITRO_PORT=3030

WORKDIR /app

# Build
FROM base as build

COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV NITRO_PORT=$NITRO_PORT

COPY --from=build /app/.output /app/.output

CMD [ "node", ".output/server/index.mjs" ]