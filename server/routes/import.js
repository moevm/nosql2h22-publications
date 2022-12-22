module.exports = function(app, db) {
    app.post('/api/v1/import', (req, res) => {
        async function uploadPublications() {
            try {
                const data = req.body;
                db.collection('publications').insertMany(data, function(err, res){
                    if(err) throw err;
                })
                 
            }catch(err) {
                console.log(err);
            }
        }
        uploadPublications();
    })
}