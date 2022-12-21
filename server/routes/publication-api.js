module.exports = function(app, db) {
    app.post('/api/v1/publication', (req, res) => {
        db.collection('publications').find({}).toArray(function(err, results){
            if(err) return console.log(err);
            res.json({result: results, total: results.length});
        });
    });

};