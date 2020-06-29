FROM node:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm audit fix --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]