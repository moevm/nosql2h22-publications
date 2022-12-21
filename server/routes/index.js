const publicationRoutes = require('./publication-api.js');
module.exports = function(app, db) {
  publicationRoutes(app, db);
};