FROM mongo:6.0.2

ARG DATABASE_URI

ENV DATABASE_URI ${DATABASE_URI}

COPY data.json /data.json

CMD mongoimport --uri ${DATABASE_URI} --collection publications --type json --file /data.json --jsonArray