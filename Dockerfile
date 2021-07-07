FROM node:14-buster-slim as build

LABEL decription="Production image for KitchenFarmr frontend."

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint && npm run build && npm prune --production && npm i serve

FROM gcr.io/distroless/nodejs:14

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules

HEALTHCHECK --interval=1m --timeout=5s --retries=2 \
    CMD curl -f http://localhost || exit 1

CMD [ "node_modules/.bin/serve", "-s", "build", "-l", "3000" ]
