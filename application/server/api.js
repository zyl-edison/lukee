'use strict';

const appConfig = LUKEE.config.get('appConfig');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../../log/traffics.log'), {flags: 'a'}
);

let middlewares = [];
middlewares.push(bodyParser.urlencoded({ extended: false }));
middlewares.push(bodyParser.json({
  type: 'application/json'
}));

if (appConfig.environment === 'development') {
  middlewares.push(morgan(appConfig.requestLogLevel));
} else {
  middlewares.push(morgan(
    appConfig.requestLogLevel,
    { stream: accessLogStream }
  ));
}

const apiServer = new LUKEE.APIServer(appConfig, middlewares, LUKEE.router.all());

module.exports = new LUKEE.Register('apiServer', apiServer);
