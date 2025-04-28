FROM node:18

WORKDIR /app

COPY server.js .


RUN npm init -y && npm install express pg

EXPOSE 5000

CMD ["node", "server.js"]
