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
    var docToUpdate =  { "_id" : JSON.parse(req.query.id) };
    var jsonUpdate = JSON.parse(req.query.record);
    console.log('to update ' + jsonUpdate);
    dbOperations.updateAndRetreive(docToUpdate, jsonUpdate)
      .then((accept, reject) => {
        if (reject) {
          console.log(reject);
          //TODO: send error
        }
        res.send(accept);
      });
   });
};