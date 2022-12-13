FROM ubuntu:20.04
EXPOSE 8000

# Установка зависимостей
RUN apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -s
RUN apt install -y nodejs
RUN apt install -y mongodb

# Установка зависимостей для сервера и его разворачивание 
COPY /server /server
WORKDIR /server
RUN npm install
CMD service mongodb start && node server.js

