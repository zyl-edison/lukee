'use strict';

global.LUKEE = {};
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Unit Test - After system initiated', () => {

  before(() => {
    const System = require('../../index');
    const sys = new System();
    sys.init();

    LUKEE.server.get('apiServer').start();
    LUKEE.server.get('databaseServer').start();
  });

  after(() => {
    mongoose.disconnect();
    LUKEE.server.get('apiServer').server.close();
  });

  it('LUKEE has all classes', () => {
    const classNames = [
      'APIServer',
      'Configuration',
      'Container',
      'Controller',
      'DatabaseServer',
      'Helper',
      'HttpResponseError',
      'Register',
      'Server',
    ];

    expect(LUKEE).to.contain.all.keys(classNames);
  });

  it('LUKEE has all containers', () => {
    const containerNames = [
      'config',
      'server',
      'helper',
      'library',
      'schema',
      'model',
      'controller',
      'router'
    ];

    expect(LUKEE).to.contain.all.keys(containerNames);
  });

  it('All items in config container are instance of Configuration', () => {
    const Configuration = LUKEE.Configuration;
    const dict = LUKEE.config.all();

    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        expect(dict[key]).to.be.instanceof(Configuration);
      }
    }
  });

  it('All items in server container are instance of Server', () => {
    const Server = LUKEE.Server;
    const dict = LUKEE.server.all();

    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        expect(dict[key]).to.be.instanceof(Server);
      }
    }
  });

  it('All items in helper container are instance of Helper', () => {
    const Helper = LUKEE.Helper;
    const dict = LUKEE.helper.all();

    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        expect(dict[key]).to.be.instanceof(Helper);
      }
    }
  });

  it('All items in controller container are instance of Controller', () => {
    const Controller = LUKEE.Controller;
    const dict = LUKEE.controller.all();

    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        expect(dict[key]).to.be.instanceof(Controller);
      }
    }
  });

  it('All items in schema container are instance of mongoose schema', () => {
    const Schema = mongoose.Schema;
    const dict = LUKEE.schema.all();

    for (let key in dict) {
      if (dict.hasOwnProperty(key)) {
        expect(dict[key]).to.be.instanceof(Schema);
      }
    }
  });

  it('Server container contains apiServer and databaseServer', () => {
    const serverNames = ['apiServer', 'databaseServer'];

    expect(LUKEE.server.all()).to.contain.all.keys(serverNames);
  });

  it('Config container contains appConfig and databaseConfig', () => {
    const configNames = ['appConfig', 'databaseConfig'];

    expect(LUKEE.config.all()).to.contain.all.keys(configNames);
  });

  it('GET /', done => {
    const app = LUKEE.server.get('apiServer').app;
    const logger = LUKEE.helper.get('logger');

    chai
    .request(app)
    .get('/')
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      expect(res.status).to.equal(200);
      expect(res.text).to.equal('System is running ...');
      done();
    });
  });
});
