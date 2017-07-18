const express = require('express');
const app = express();
const config = require('./config.js');
const dbOperations = require('./src/dbOperations.js');
const morgan = require('morgan');

app.use(morgan('combined'));
// TODO: Look into nodemon

// load routes
require('./routes/static.js').addRoutes(app, config);
require('./routes/appDefault.js').addRoutes(app, config);
require('./routes/dbOperations.js').addRoutes(app, config);

// load datastore
dbOperations.loadDatastore();

app.listen(3000, () => {
  //var open = require('open');
  //open('http://localhost:3000');
  console.log('server listening on port 3000');
});

module.exports = app;
