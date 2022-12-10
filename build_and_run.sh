docker build -t pub-server -f Dockerfile-server .
docker build -t pub-client -f Dockerfile-client .
docker run -p 8000:8000 -i -d -t pub-server
docker run -p 3000:3000 -i -d -t pub-client