FROM node:14-alpine

WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH
COPY ./package.json /package.json 
RUN yarn install --no-lockfile
ENV PORT 3000
COPY public /public
COPY src /src

CMD ["yarn", "start"]
