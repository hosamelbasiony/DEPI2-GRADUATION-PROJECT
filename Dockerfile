FROM node:22-bullseye

RUN apt-get install gnupg curl

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
    sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
    --dearmor

RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/8.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

RUN apt-get update -y

RUN apt-get install -y mongodb-org

RUN sudo systemctl start mongod

RUN sudo systemctl daemon-reload

RUN sudo systemctl enable mongod


