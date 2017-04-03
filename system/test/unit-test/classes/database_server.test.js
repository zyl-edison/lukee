'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of DatabaseServer created', () => {
  const DatabaseServer = require('../../../classes/database_server');

  it('should has properties url', () => {
    const databaseServer = new DatabaseServer({
      connectionString: 'mongodb://localhost:27017/',
      databaseName: 'dbTest'
    });
    expect(databaseServer.url).to.be.exist;
  });
});
