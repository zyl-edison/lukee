'use strict';

const path = require('path');
const simpleNodeLogger = require('simple-node-logger');
const options = {
  logDirectory: path.resolve(__dirname + '/../..') + '/log/app',
  fileNamePattern:'<DATE>.log',
  dateFormat: 'YYYY-MM-DD'
};

/**
 * Logger Class
 */
class Logger {
  constructor() {
    this.lg = simpleNodeLogger.createRollingFileLogger(options);
    this.environment = process.env.NODE_SERVER_ENV || 'development';
  }

  /**
   * It will throw the error under development environment. Otherwise, write
   * to the log file with the data as its name in the log folder.
   *
   * Ex: 2017-03-30.log
   */
  error(err) {
    switch(this.environment) {
      case 'development':
        throw err;
      default:
        this.lg.error(err.message, ' at ', (new Date()).toISOString());
    }
  }
}

module.exports = Logger;
