'use strict';

global.LUKEE = {};
const express = require('express');
const mongoose = require('mongoose');
let chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('System endpoint test - After system initiated', () => {
  const moduleName = 'daddylovesyou' + Date.now();
  const collectionName = moduleName;

  let app, logger;

  before(() => {
    const System = require('../../index');
    const Controller = require('../../classes/controller');

    let sys, schema, Model, ctrl, router;

    // Init system
    sys = new System();
    sys.init();

    logger =  new LUKEE.Logger();

    // Inject a test route for testing default endpoint
    // (Ex: collection: daddylovesyou1489766565188)

    // Inject into schema container
    schema = new mongoose.Schema({
      version: String,
      testDate: {
        type: Date,
        default: Date.now
      }
    }, {
      collections: collectionName
    });
    LUKEE.schema.set(moduleName, schema);

    // Inject into model container
    Model = mongoose.model(collectionName, schema);
    LUKEE.model.set(moduleName, Model);

    // Inject into controller container
    class newController extends Controller {
      someAction() { return () => {}; }
    }
    ctrl = new newController(Model, logger);
    LUKEE.controller.set(moduleName, ctrl);

    // Inject into router container
    router = express.Router();
    LUKEE.helper.get('mapper').map({
      router: router,
      controller: ctrl,
      customMapper: [{
        name: 'someAction',
        method: 'get',
        url: '/'
      }]
    });
    LUKEE.router.set(moduleName, router);

    app = LUKEE.server.get('apiServer').app;

    // Start servers
    LUKEE.server.get('apiServer').start();
    LUKEE.server.get('databaseServer').start();
  });

  after(() => {
    mongoose.disconnect();
    LUKEE.server.get('apiServer').server.close();
    global.LUKEE = {};
  });

  it('GET /', done => {
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

  it('POST /api/<moduleName>', done => {
    chai
    .request(app)
    .post('/api/' + moduleName)
    .send({ version: '1.0' })
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      expect(res.body.version).to.equal('1.0');
      done();
    });
  });

  it('GET /api/<moduleName>', done => {
    chai
    .request(app)
    .get('/api/' + moduleName)
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }
      expect(res.body).to.be.instanceof(Array);
      expect(res.body).to.not.be.empty;
      done();
    });
  });

  it('GET /api/<moduleName>/:id', done => {
    chai
    .request(app)
    .get('/api/' + moduleName)
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      const documents = res.body;
      const firstDocumentId = documents[0]._id;

      chai.request(app)
      .get('/api/' + moduleName + '/' + firstDocumentId)
      .end((error, res) => {
        if (error) {
          logger.error(error);
        }
        expect(res.body).to.contain.all.keys([
          '_id',
          'version',
          '__v',
          'testDate'
        ]);
        done();
      });
    });
  });

  it('UPDATE /api/<moduleName>/:id', done => {
    chai
    .request(app)
    .get('/api/' + moduleName)
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      const documents = res.body;
      const firstDocumentId = documents[0]._id;

      chai.request(app)
      .put('/api/' + moduleName + '/' + firstDocumentId)
      .send({ version : '2.0'})
      .end((error, res) => {
        if (error) {
          logger.error(error);
        }

        expect(res.body.version).to.equal('2.0');
        done();
      });
    });
  });

  it('DELETE /api/<moduleName>', done => {
    chai
    .request(app)
    .get('/api/' + moduleName)
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      const documents = res.body;
      const ids = documents.map(d => {
        return d._id;
      });

      chai.request(app)
      .delete('/api/' + moduleName)
      .send({ ids : ids })
      .end((error, res) => {
        if (error) {
          logger.error(error);
        }

        expect(res.body).to.be.empty;
        done();
      });
    });
  });

  it('DELETE One /api/<moduleName>', done => {
    chai
    .request(app)
    .post('/api/' + moduleName)
    .send({ version: '1.0' })
    .end((error, res) => {
      if (error) {
        logger.error(error);
      }

      chai.request(app)
      .delete('/api/' + moduleName + '/' + res.body._id)
      .end((error, res) => {
        if (error) {
          logger.error(error);
        }
        expect(res.body).to.be.empty;
        done();
      });
    });
  });
});
