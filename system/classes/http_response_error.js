'use strict';

/**
 * Http Response Error Class
 *
 * The http response error class is inherited from Error class which will
 * create an instance with statusCode and the translateKey
 *
 * {
 *   name
 *   isCustomError
 *   statusCode
 *   translateKey
 * }
 */
class HttpResponseError extends Error {
  constructor(key, statusCode, message) {
    super(message);
    this.name = key && statusCode ?
                [key, statusCode, 'Error'].join('') :
                'HttpResponseError';

    this.isCustomError = true;
    this.statusCode = statusCode;
    this.translateKey = key + statusCode;
  }
}

module.exports = HttpResponseError;
