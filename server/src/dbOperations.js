const config = require('../config.js');
const dbOperations = {};

var db = {};

/**
 * Retreives data from database depending on search criteria
 */
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

dbOperations.update = (updateCriteria, document) => {
  return new Promise((fulfill, reject) => {
    db.computers.update(updateCriteria, document, { multi: true }, (err, numReplaced) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return fulfill(numReplaced);
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
      status: 'Available',
      student: 'Student',
      time: 0
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

/**
 * Updates data in db and returns new value
 */
dbOperations.updateAndRetreive = (docToUpdate, updatedDoc) => {
  return new Promise((fulfill, reject) => {
    console.log('doc to update' + JSON.stringify(docToUpdate));
    console.log('updated doc' + JSON.stringify(updatedDoc));
    dbOperations.update(docToUpdate, { $set : updatedDoc })
      .then((response) => {
        dbOperations.find(docToUpdate)
          .then((results, err) => {
              if (err) {
                reject(err);
              }
              console.log("record " + JSON.stringify(results));
              fulfill(results);
          });
      })
  });
};

module.exports = dbOperations;