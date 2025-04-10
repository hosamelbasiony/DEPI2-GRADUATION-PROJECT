FROM node:20

# Install MongoDB
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -qO - https://www.mongodb.org/static/pgp/server-8.0.asc | apt-key add - && \
    echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/8.0 main" | tee /etc/apt/sources.list.d/mongodb-org-8.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY server.js public/ ./

EXPOSE 3000
EXPOSE 27017

CMD service mongod start && node server.js