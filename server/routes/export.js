module.exports = function(app, db) {
    app.get('/api/v1/export', (req, res) => {
        async function getAllPublications() {
            try {
                const tmp = await db.collection('publications').find().toArray();
                res.send(tmp)
                 
            }catch(err) {
                console.log(err);
            }
        }
        getAllPublications();
    })
}