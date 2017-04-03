'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of Container created', () => {
  const Container = require('../../../classes/container');

  it('should return the correct value when passing key into get()', () => {
    let container = new Container({
      prop1: 'p1',
      prop2: 'p2',
    });

    expect(container.get('prop1')).to.equal('p1');
    expect(container.get('prop2')).to.equal('p2');
  });

  it('should successfully set the key with value', () => {
    let container = new Container({
      prop1: 'p1',
      prop2: 'p2',
    });

    container.set('prop3', 'p3');
    expect(container.get('prop3')).to.equal('p3');
  });

  it('should return all keys with corresponding values(object)', () => {
    let container = new Container({
      prop1: 'p1',
      prop2: 'p2',
      prop3: 'p3'
    });

    const dict = container.all();

    expect(dict.prop1).to.equal('p1');
    expect(dict.prop2).to.equal('p2');
    expect(dict.prop3).to.equal('p3');
  });

  it('Dict is empty if there is nothing to pass into constructor', () => {
    let container = new Container();

    expect(container.dict).to.empty;
    expect(container.all()).to.empty;
  });

  it('should return null if try to get a key which does not exists', () => {
    let container = new Container();

    expect(container.get('prop1')).to.be.null;
  });

  it('should throw error if try to set the same which already exists', () => {
    let container = new Container({
      prop1: 'p1',
      prop2: 'p2',
      prop3: 'p3'
    });

    try {
      container.set('prop1', 'p4');
    } catch(e) {
      expect(e.message).to.equal('prop1 component exists.');
    }
  });
});
