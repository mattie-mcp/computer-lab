const config = require('../config.js');
const Datastore = require('nedb');
const dbOperations = {};

var db = {};

dbOperations.loadDatabase = () => {
  // load database
  db.computers = new Datastore({ fileName: config.db.computers, autoLoad: true });
  db.computers.loadDatabase((err) => {
    if (err) { console.log(err); }
    defaultLoad();
  });
};

dbOperations.find = (search) => {
  return db.computers.find(search, function (err, docs) {
    if (err) {
      console.log(err);
    }
    return docs;
  });
};
var defaultLoad = () => {
  console.log('default load');
  dbOperations.find({})
    .then((result) => {
      if (result.count > 0){
        return;
      }
      for (var i=0; i<config.app.computerCount; i++) {
        var document = {
          name: i
        };
        db.insert(document);
      }
  });
};

module.exports = dbOperations;