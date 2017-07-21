const dbOperations = require('../src/dbOperations.js');

exports.addRoutes = (app, config) => {
  app.get('/computers/', (req, res) => {
    var jsonParam = JSON.parse(req.query.filter);
    dbOperations.find(jsonParam)
      .then((accept, reject) => {
        res.send(accept);
      });
  });
  app.post('/computers/', (req, res) => {
    var jsonUpdate = JSON.parse(req.query.filter);
    dbOperations.updateAndRetreive(jsonUpdate)
      .then((accept, reject) => {
        res.send(accept);
      });
  });
};