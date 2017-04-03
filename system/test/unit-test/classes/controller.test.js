'use strict';

const mongoose = require('mongoose');
const express = require('express');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After a controller initiated', () => {
  const collectionName = 'daddylovesyou' + Date.now();
  const Controller = require('../../../classes/controller');
  const logger = new (require('../../../classes/logger'))();
  const mapper = require('../../../helper/mapper').value;

  let Mod, controller;

  before(() => {
    // Schema
    let schema = new mongoose.Schema({
      version: String
    }, {
      collections: collectionName
    });

    // Model
    Mod = mongoose.model(collectionName, schema);

    // Controller
    class newController extends Controller {
      someAction() { return () => {}; }
    }
    controller = new newController(Mod, logger);

    // Router
    let router = express.Router();
    mapper.map({
      router: router,
      controller: controller,
      customMapper: [{
        name: 'someAction',
        method: 'get',
        url: '/'
      }]
    });
  });

  beforeEach(() => {
    sinon.stub(Mod, 'find');
    sinon.stub(Mod, 'findOne');
    sinon.stub(Mod, 'findByIdAndUpdate');
    sinon.stub(Mod, 'remove');
    sinon.stub(Mod.prototype, 'save');
    sinon.spy(controller.logger, 'error');
  });

  afterEach(() => {
    Mod.find.restore();
    Mod.findOne.restore();
    Mod.findByIdAndUpdate.restore();
    Mod.remove.restore();
    Mod.prototype.save.restore();
    controller.logger.error.restore();
  });

  it('create success', () => {
    const sendStub = sinon.stub();
    const res = {
      status: function() {
        return {
          send: sendStub
        };
      }
    };

    Mod.prototype.save.yields(null, 'edison');
    controller.create()({}, res);
    sinon.assert.calledWith(sendStub, 'edison');
  });

  it('create fail', () => {
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.prototype.save.yields(new Error('create error on collection <' + collectionName + '>'), null);
    controller.create()({}, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('acquire success', () => {
    const sendStub = sinon.stub();
    const res = {
      status: function() {
        return {
          send: sendStub
        };
      }
    };

    Mod.find.yields(null, 'edison');
    controller.acquire()(null, res);
    sinon.assert.calledWith(sendStub, 'edison');
  });

  it('acquire fail', () => {
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.find.yields(new Error('acquire error on collection <' + collectionName + '>'), null);
    controller.acquire()(null, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('acquireOne success', () => {
    const req = { params: {} };
    const sendStub = sinon.stub();
    const res = {
      status: function() {
        return {
          send: sendStub
        };
      }
    };

    Mod.findOne.yields(null, 'edison');
    controller.acquireOne()(req, res);
    sinon.assert.calledWith(sendStub, 'edison');
  });

  it('acquireOne fail', () => {
    const req = { params: {} };
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.findOne.yields(new Error('acquireOne error on collection <' + collectionName + '>'), null);
    controller.acquireOne()(req, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('update', () => {
    controller.update()();
  });


  it('updatOne success', () => {
    const req = { params: {} };
    const sendStub = sinon.stub();
    const res = {
        status: function() {
          return {
            send: sendStub
          };
        }
    };

    Mod.findByIdAndUpdate.yields(null, 'edison');
    controller.updateOne()(req, res);
    sinon.assert.calledWith(sendStub, 'edison');
  });

  it('updatOne fail', () => {
    const req = { params: {} };
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.findByIdAndUpdate.yields(new Error('updateOne error on collection <' + collectionName + '>'), null);
    controller.updateOne()(req, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('delete sucess', () => {
    const req = {
      params: {},
      body: {
        ids: []
      }
    };
    const sendStub = sinon.stub();
    const res = {
      status: function() {
        return {
          send: sendStub
        };
      }
    };

    Mod.remove.yields(null, []);
    controller.delete()(req, res);
    sinon.assert.calledWith(sendStub, 'success');
  });

  it('delete fail', () => {
    const req = {
      params: {},
      body: {
        ids: []
      }
    };
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.remove.yields(new Error('delete error on collection <' + collectionName + '>'), null);
    controller.delete()(req, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('deleteOne sucess', () => {
    const req = { params: {} };
    const sendStub = sinon.stub();
    const res = {
      status: function() {
        return {
          send: sendStub
        };
      }
    };

    Mod.remove.yields(null, []);
    controller.deleteOne()(req, res);
    sinon.assert.calledWith(sendStub, 'success');
  });

  it('deleteOne fail', () => {
    const req = { params: {} };
    const res = {
      status: function() {
        return {
          send: function() {}
        };
      }
    };

    Mod.remove.yields(new Error('deleteOne error on collection <' + collectionName + '>'), null);
    controller.deleteOne()(req, res);
    expect(controller.logger.error.calledOnce).to.equal(true);
  });

  it('custom only controller', () => {
    class anotherNewController extends Controller {
      someAction() { return () => {}; }
    }
    controller = new anotherNewController(Mod, logger);

    // Set Router
    mapper.map({
      router: express.Router(),
      controller: controller,
      customMapper: [{
        name: 'someAction',
        method: 'get',
        url: '/'
      }],
      customOnly: true
    });
  });
});
