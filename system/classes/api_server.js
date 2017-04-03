'use strict';

const express = require('express');
const Server = require('./server');

/**
 * API Server Class
 *
 * The API Server is a web server that build on top of express framework
 *
 */
class APIServer extends Server {
  constructor(appConfig, middlewares, routerDictionary) {
    super();
    this.port = appConfig.port;
    this.endpointPrefix = appConfig.endpointPrefix;
    this.app = express();
    this.middlewares = middlewares;
    this.routerDictionary = routerDictionary;
    this.server = null;
  }

  /**
   * 1. Register middlewares
   * 2. Register routers including the index route
   */
  init() {
    const app = this.app;
    const routerDictionary = this.routerDictionary;

    // Middlewares
    this.middlewares.forEach(mw => { app.use(mw); });

    // Routes - all route will prefix with api
    Object.keys(routerDictionary).forEach(routerName => {
      app.use(
        '/' + this.endpointPrefix + '/' + routerName,
        routerDictionary[routerName]
      );
    });

    // Index Route
    app.get('/', (req, res) => { res.send('System is running ...'); });
  }

  /**
   * Start the server at a certain port
   */
  connect() {
    const port = this.port;

    this.server = this.app.listen(port, () => {
      console.log('API Server has been started at port ' + port);
    });
  }
}

module.exports = APIServer;
