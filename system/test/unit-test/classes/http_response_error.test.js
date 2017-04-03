'use strict';

const chai = require('chai');
const expect = chai.expect;

describe('Unit Test - After an instance of HttpResponseError created', () => {
  const HttpResponseError = require('../../../classes/http_response_error');
  const hrError = new HttpResponseError('notFound', 404, 'not found');
  const emptyHrError = new HttpResponseError(null, null, 'not found');

  it('should be an instance of Error', () => {
    expect(hrError).to.be.instanceof(Error);
  });

  it('should includes name, message, isCustomError, statusCode and translateKey', () => {
    expect(hrError.name).to.equal('notFound404Error');
    expect(hrError.isCustomError).to.equal(true);
    expect(hrError.statusCode).to.equal(404);
    expect(hrError.translateKey).to.equal('notFound404');
  });

  it('should set name to HttpResponseError when no key and statusCode', () => {
    expect(emptyHrError.name).to.equal('HttpResponseError');
  });
});
