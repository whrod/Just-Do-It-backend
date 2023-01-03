FROM node:16.4.2
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
RUN npm i pm2 -g
COPY . .
EXPOSE 8000
CMD ["pm2-runtime","app.js"]",