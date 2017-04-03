'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of Configuration created', () => {
  let config;

  before(() => {
    const Configuration = require('../../../classes/configuration');

    config = new Configuration({
      prop1: 'p1',
      prop2: 'p2',
    });
  });

  it('should has properties prop1 and prop2', () => {
    expect(config.prop1).to.equal('p1');
    expect(config.prop2).to.equal('p2');
  });
});
