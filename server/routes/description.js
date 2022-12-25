module.exports = function(app, db) {
    app.post('/api/v1/description', (req, res) => {
        async function getDescription() {
            try {
                const id = req.body;
                const data = await db.collection('publications').find({_id: id});
                res.send(data);
                 
            }catch(err) {
                console.log(err);
            }
        }
        getDescription();
    })
}