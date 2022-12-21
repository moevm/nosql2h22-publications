module.exports = function(app, db) {
    app.post('/api/v1/import', (req, res) => {
        async function uploadPublications() {
            try {
                const data = req.file;
                const docs = JSON.parse(data);
                db.collection('publications').insertMany(docs, function(err, res){
                    if(err) throw err;
                })
                 
            }catch(err) {
                console.log(err);
            }
        }
        uploadPublications();
    })
}