'use strict';

const mongoose = require('mongoose');
const Server = require('./server');

mongoose.Promise = global.Promise;

/**
 * Database Server Class
 */
class DatabaseServer extends Server {
  constructor(databaseConfig) {
    super();
    this.url = databaseConfig.connectionString + databaseConfig.databaseName;
  }

  init() {
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Database Server is connected.');
    });
  }

  connect() {
    mongoose.connect(this.url);
  }
}

module.exports = DatabaseServer;
