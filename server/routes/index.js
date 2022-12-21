const publicationRoutes = require('./publication-api.js');
const publicationExport = require('./export.js');
const publicationImport = require('./import.js');
module.exports = function(app, db) {
  publicationRoutes(app, db);
  publicationExport(app, db);
  publicationImport(app, db);
};