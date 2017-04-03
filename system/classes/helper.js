'use strict';

/**
 * Helper Class
 */
class Helper {
  constructor(fnObj) {
    Object.keys(fnObj).forEach(k => {
      this[k] = fnObj[k];
    });
  }
}

module.exports = Helper;
