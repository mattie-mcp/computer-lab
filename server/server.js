const express = require('express');
const app = express();
const config = require('./config.js');

// TODO: Add environment
// TODO: Database stuff - mongoose
// TODO: Look into nodemon

// load routes
require('./routes/static.js').addRoutes(app, config);
require('./routes/appDefault.js').addRoutes(app, config);

app.listen(3000, () => {
  //var open = require('open');
  //open('http://localhost:3000');
  console.log('server listening on port 3000');
});

module.exports = app;
