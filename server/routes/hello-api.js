module.exports = function(app, db) {
    app.get('/api/v1/hello', (req, res) => {
        db.collection('users').find({}).toArray(function(err, results){
            if(err) return console.log(err);
            res.send(results);
        });
    });

};