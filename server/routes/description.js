module.exports = function(app, db) {
    app.post('/api/v1/description', (req, res) => {
        async function getDescription() {
            try {
                const {id} = req.body.params;
                let findId = require('mongodb').ObjectId(id);
                const data = await db.collection('publications').find({_id: findId}).toArray();
                console.log(data[0])
                res.send(data[0]);
                 
            }catch(err) {
                console.log(err);
            }
        }
        getDescription();
    })
}