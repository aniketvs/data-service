FROM node:18

WORKDIR /app/data-service

COPY data-service/package.json ./

RUN npm install

COPY data-service/ ./

EXPOSE 3005

CMD [ "npm","run","start:dev" ]