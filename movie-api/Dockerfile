FROM node:8-alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 8000
CMD [ "node", "app.js" ]
