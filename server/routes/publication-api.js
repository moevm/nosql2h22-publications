module.exports = function(app, db) {
    app.post('/api/v1/publication', async (req, res) => {
        const {page, params} = req.body;
        const nPerPage = 10;
        let filterParams = Object.keys(params)
                            .reduce((a, k) => ({ ...a, [k]: {$regex: params[k], $options: 'i'} }), {});

        if(params.year_publication){
            let obj = {}
            if(params.year_publication.from !== undefined) obj = {$gte: +params.year_publication.from};
            if(params.year_publication.to !== undefined) obj = {...obj, $lte: +params.year_publication.to};
            filterParams.year_publication = obj;
        }
        if(params.number_quotes){
            let obj = {}
            if(params.number_quotes.from !== undefined) obj = {$gte: +params.number_quotes.from};
            if(params.number_quotes.to !== undefined) obj = {...obj, $lte: +params.number_quotes.to};
            filterParams.number_quotes = obj;
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