'use strict';

const Helper = require('../classes/helper');
const Register = require('../classes/Register');

/**
 * Mapper Helper
 */
const mapper = new Helper({
  /**
   * Map the controller functions to router
   * @param  {[Object]} options
   * {
   *   router: Object
   *   controller: Object
   *   customMapper: Array
   *   customOnly: Boolean
   * }
   */
  map: options => {
    const defaultMapper = [{
      name: 'create',
      method: 'post',
      url: '/'
    }, {
      name: 'acquire',
      method: 'get',
      url: '/'
    }, {
      name: 'acquireOne',
      method: 'get',
      url: '/:id'
    }, {
      name: 'update',
      method: 'put',
      url: '/'
    }, {
      name: 'updateOne',
      method: 'put',
      url: '/:id'
    }, {
      name: 'delete',
      method: 'delete',
      url: '/'
    }, {
      name: 'deleteOne',
      method: 'delete',
      url: '/:id'
    }];

    const router = options.router;
    const controller = options.controller;
    const customMapper = options.customMapper;

    if (!options.customOnly) {
      defaultMapper.forEach(dm => {
        router[dm.method](dm.url, controller[dm.name].call(controller));
      });
    }

    if (customMapper) {
      customMapper.forEach(cm => {
        router[cm.method](cm.url, controller[cm.name].call(controller));
      });
    }
  }
});

module.exports = new Register('mapper', mapper);
