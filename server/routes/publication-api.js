module.exports = function(app, db) {
    app.post('/api/v1/publication', async (req, res) => {
        const {page, params} = req.body;
        const nPerPage = 10;
        let filterParams = Object.keys(params)
                            .reduce((a, k) => ({ ...a, [k]: {$regex: params[k], $options: 'i'} }), {});

        if(params.year_publication){
            filterParams.year_publication = +params.year_publication;
        }
        if(params.number_quotes){
            filterParams.number_quotes = {$gte: +params.number_quotes}
        }
        const data =  db.collection('publications').find(filterParams)
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