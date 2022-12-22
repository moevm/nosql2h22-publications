const publicationRoutes = require('./publication-api.js');
const publicationExport = require('./export.js');
const publicationImport = require('./import.js');
const tableExport = require('./export-table.js');
module.exports = function(app, db) {
  publicationRoutes(app, db);
  publicationExport(app, db);
  publicationImport(app, db);
  tableExport(app, db);
};