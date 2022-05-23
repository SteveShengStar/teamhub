FROM node:14-alpine AS deps

WORKDIR /usr/src/app

#install app deps (so we don't have to exec 
# in the container everytime)

COPY package*.json ./
RUN npm ci

#build only when needed

FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . . 

RUN npm run build

#run
FROM node:14-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV development
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000

CMD ["node", "server.js"]