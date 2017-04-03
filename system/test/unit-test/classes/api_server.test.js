'use strict';

const chai = require('chai');
const expect = chai.expect;
const bodyParser = require('body-parser');
const express = require('express');

describe('Unit Test - After an instance of APIServer created', () => {
  let apiServer;
  let Server;

  beforeEach(() => {
    const APIServer = require('../../../classes/api_server');

    const appConfig = {
      port: 8080,
      endpointPrefix: 'api'
    };

    let middlewares = [];
    middlewares.push(bodyParser.urlencoded({ extended: false }));
    middlewares.push(bodyParser.json({ type: 'application/json' }));

    const routerDictionary = {
      sample: express.Router()
    };

    Server = require('../../../classes/server');

    apiServer = new APIServer(appConfig, middlewares, routerDictionary);
  });

  it('should also be an instance of Server', () => {
    expect(apiServer).to.be.instanceof(Server);
  });

  it('should has properties such as port, endpointPrefix, app', () => {
    expect(apiServer.port).to.equal(8080);
    expect(apiServer.endpointPrefix).to.equal('api');
    expect(apiServer.app).to.exist;
  });

  it('should register all routes into app after calling init()', () => {
    apiServer.init();
    expect(apiServer.app._router).to.exist;
  });
});
