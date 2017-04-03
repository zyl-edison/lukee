'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of Register created', () => {
  const Register = require('../../../classes/register');


  it('should has properties name and value', () => {
    const register = new Register('someComponent', {});
    expect(register.name).to.equal('someComponent');
    expect(register.value).to.be.empty;
  });
});
