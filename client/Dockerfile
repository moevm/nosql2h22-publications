FROM ubuntu:20.04
EXPOSE 3006

# Установка зависимостей
RUN apt update
RUN apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -s
RUN apt install -y nodejs

# Установка зависимостей для сервера и его разворачивание 
COPY . .
RUN npm install
CMD npm start