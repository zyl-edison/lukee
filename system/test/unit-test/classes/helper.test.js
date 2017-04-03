'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of Helper created', () => {
  const Helper = require('../../../classes/helper');

  it('should has functions (func1, func2)', () => {
    const helper = new Helper({
      func1: () => { return 'func1'; },
      func2: () => { return 'func2'; }
    });
    expect(helper.func1()).to.equal('func1');
    expect(helper.func2()).to.equal('func2');
  });
});
