FROM node:18

WORKDIR /app

COPY . .

RUN npm init -y && npm install express

EXPOSE 80

CMD ["node", "server.js"]
