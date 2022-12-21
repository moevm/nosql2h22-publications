module.exports = function(app, db) {
    app.post('/api/v1/export-table', async (req, res) => {
        const {params} = req.body;
        let filterParams = Object.keys(params)
                            .reduce((a, k) => ({ ...a, [k]: {$regex: params[k], $options: 'i'} }), {});

        if(params.year_publication){
            filterParams.year_publication = +params.year_publication;
        }
        if(params.number_quotes){
            filterParams.number_quotes = {$gte: +params.number_quotes}
        }
        const data = await db.collection('publications').find(filterParams).toArray();
        res.send(data);
    });
};