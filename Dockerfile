FROM node:18.16.0-alpine3.17 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18.16.0-alpine3.17 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

WORKDIR /usr/src/app

COPY --chown=nodejs:nodejs package*.json ./

RUN npm install --only=production --ignore-scripts

COPY --chown=nodejs:nodejs --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]