module.exports = function(app, db) {
    console.log(db);
    app.post('/api/v1/publication', (req, res) => {
        console.log(db);
        db.collection('publications').find({}).toArray(function(err, results){
            if(err) return console.log(err);
            console.log(results);
            res.send(results);
        });
        // const {data, page} = req.body;
        // const dataToSend = jsonPublications.slice(page * 10, (page + 1)* 10);
        // res.json({result: dataToSend, total: jsonPublications.length});
    });

};