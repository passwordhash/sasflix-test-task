FROM node:22.2-alpine AS build
LABEL authors="passwordhash"

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", ".config/server/server.mjs"]
