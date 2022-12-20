const noteRoutes = require('./publication-api.js');
module.exports = function(app, db) {
  noteRoutes(app, db);
};