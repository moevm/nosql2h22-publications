const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8000;
// const jsonParser = express.json();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

require('./routes')(app);
app.listen(port, function(){
    console.log("Сервер ожидает подключения...");
});

// MongoClient.connect('mongodb://127.0.0.1:27017/', (err, database) => {
//     if (err) return console.log(err);
//     require('./routes')(app, database.db("test"));
    
//     app.listen(port, function(){
//         console.log("Сервер ожидает подключения...");
//     });
// });