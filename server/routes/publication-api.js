const jsonPublications = require('../data/data.json');

module.exports = function(app, db) {
    app.post('/api/v1/publication', (req, res) => {
        // db.collection('users').find({}).toArray(function(err, results){
        //     if(err) return console.log(err);
        //     res.send(results);
        // });
        const {data, page} = req.body;
        const dataToSend = jsonPublications.slice(page * 10, (page + 1)* 10);
        res.json({result: dataToSend, total: jsonPublications.length});
    });

};