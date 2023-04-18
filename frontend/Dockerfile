FROM node:18-alpine

WORKDIR /frontend

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]