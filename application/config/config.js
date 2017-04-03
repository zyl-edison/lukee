'use strict';

/**
 * The application environment which includes the following
 *
 * development
 * test
 * production
 *
 * @type {String}
 */
const environment = process.env.NODE_SERVER_ENV || 'development';
/**
 * Reuest Log Level
 *
 * combined
 * common
 * dev
 * short
 * tiny
 */
const requestLogLevelDict = {
  development: 'dev',
  test: 'combined',
  production: 'combined'
};

const appConfig = {
  environment: environment,
  port: process.env.ENDPOINT_SERVER_PORT || 8080,
  requestLogLevel: requestLogLevelDict[environment],
  endpointPrefix: 'api'
};

module.exports = new LUKEE.Register(
  'appConfig',
  new LUKEE.Configuration(appConfig)
);
