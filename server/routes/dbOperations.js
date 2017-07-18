const dbOperations = require('../src/dbOperations.js');

exports.addRoutes = (app, config) => {
  app.get('/computers', (req, res) => {
    console.log("GET - /computers request:" + JSON.stringify(req));
    return dbOperations.find(req.data);
  });
};