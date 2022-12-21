module.exports = function(app, db) {
    app.post('/api/v1/publication', async (req, res) => {
        const {page, params} = req.body;
        const nPerPage = 10;
        const data =  db.collection('publications').find({})
        const total = await data.count();
        data
        .skip( page * nPerPage)
        .limit(nPerPage)
        .toArray(function(err, results){
            if(err) return console.log(err);
            res.json({result: results, total: total});
        });
    });

};