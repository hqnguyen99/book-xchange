FROM node:14-alpine

WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH
COPY ./package.json /package.json 
RUN yarn install --no-lockfile

COPY public /public
COPY src /src

CMD ["yarn", "start"]