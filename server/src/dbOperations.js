const config = require('../config.js');
const dbOperations = {};

var db = {};

dbOperations.updateAndRetreive = (params) => {
  return new Promise((fullfil, reject) => {

  });
};

dbOperations.find = (search) => {
  return new Promise((fulfill, reject) => {
    db.computers.find(search, function (err, docs) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return fulfill(docs);
    });
  });
};

/**
 * Inserts record into database
 */
dbOperations.insert = (document) => {
  return new Promise((fullfil, reject) => {
    db.computers.insert(document, (err, doc) => {
      if (err) {
        console.log('error ' + err);
        reject(err);
      }
      fullfil(doc);
    });
  });
};

/** 
 * Populates database with default computers 
 * */
var defaultDatabase = () => {
  for (var i=1; i<=config.app.computerCount; i++) {
    var document = {
      _id: i,
      name: 'Computer ' + i,
      status: 'Available'
    };
    dbOperations.insert(document);
  }
};

/**
 * Initial database load
 */
dbOperations.loadDatastore = () => {
  var Datastore = require('nedb');
  db.computers = new Datastore({ filename: config.db.computers });
  console.log('loaded datastore at ' + config.db.computers);
  db.computers.loadDatabase((err) => {
    if (err) { 
      console.log(err); 
      return null; 
    }
    if (config.app.refreshDatastore) {
      db.computers.remove({}, {multi: true});
    }
    db.computers.count({}, (err, count) => {
        if (!count || count === 0){
          console.log('database does not exist, default load');
          defaultDatabase();
        }
    });
  });
};


module.exports = dbOperations;