'use strict';

const appConfig = require('./config').value;

const environment = appConfig.environment;

const dbConfigObj = {
  development: {
    databaseName: 'dbDev',
    connectionString: 'mongodb://localhost:27017/'
  },
  test: {
    databaseName: 'dbTest',
    connectionString: 'mongodb://localhost:27017/'
  },
  production: {
    databaseName: 'dbProd',
    connectionString: 'mongodb://localhost:27017/'
  }
};

module.exports = new LUKEE.Register(
  'databaseConfig',
  new LUKEE.Configuration(dbConfigObj[environment])
);
