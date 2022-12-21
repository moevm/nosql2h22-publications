const publicationRoutes = require('./publication-api.js');
const publicationExport = require('./export.js');
module.exports = function(app, db) {
  publicationRoutes(app, db);
  publicationExport(app, db);
};