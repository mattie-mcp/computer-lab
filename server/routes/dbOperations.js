const dbOperations = require('../src/dbOperations.js');

exports.addRoutes = (app, config) => {
  app.get('/computers', (req, res) => {
    return dbOperations.find(req.data);
  });
};