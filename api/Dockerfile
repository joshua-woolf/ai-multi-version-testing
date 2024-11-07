FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG API_VERSION=1
ENV API_VERSION=$API_VERSION

EXPOSE 3000

CMD ["node", "index.js"]
