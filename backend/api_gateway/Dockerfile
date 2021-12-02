FROM node:17.0.1

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .
EXPOSE 99
CMD node index.js