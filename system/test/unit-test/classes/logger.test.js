'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('Unit Test - After an instance of Logger created', () => {
  const Logger = require('../../../classes/logger');
  const environment = process.env.NODE_SERVER_ENV || 'development';

  after(() => {
    process.env.NODE_SERVER_ENV = environment;
  });

  it('should throw error during development environment', () => {
    process.env.NODE_SERVER_ENV = '';
    const newLogger = new Logger();
    expect(function() {
      newLogger.error(new Error('logger class test'));
    }).to.throw(Error);
  });

  it('should log the error during any environment except development', () => {
    let newLogger, spy;

    process.env.NODE_SERVER_ENV = 'test';
    newLogger = new Logger();
    spy = sinon.spy(newLogger.lg, 'error');
    newLogger.error(new Error('logger class test'));
    expect(spy.calledOnce).to.equal(true);

    spy.restore();

    process.env.NODE_SERVER_ENV = 'production';
    newLogger = new Logger();
    spy = sinon.spy(newLogger.lg, 'error');
    newLogger.error(new Error('logger class test'));
    expect(spy.calledOnce).to.equal(true);

    spy.restore();
  });
});
