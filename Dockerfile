FROM node:16.4.2
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["pm2", "start","app.js"]