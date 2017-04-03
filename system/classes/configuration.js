'use strict';

/**
 * Configuration Class
 */
class Configuration {
  constructor(config) {
    Object.keys(config).forEach(key => {
      this[key] = config[key];
    });
  }
}

module.exports = Configuration;
