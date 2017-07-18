var path = require('path');

module.exports = {
  app: {
    computerCount: 20,
    refreshDatastore: false
  },
  db : {
    computers: path.join(__dirname, '/src/db/computers.db')
  },
  server: {
    distFolder: path.resolve(__dirname, '../client/dist'),
    staticFolder: path.resolve(__dirname, '../client/assets')
  }
};