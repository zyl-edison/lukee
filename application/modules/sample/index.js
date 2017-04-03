'use strict';

const moduleName = 'sample';
const schema = require('./schema');
const model = require('./model');
const controller = require('./controller');
const router = require('./router');

module.exports = new LUKEE.Register(moduleName, {
  schema: schema,
  model: model,
  controller: controller,
  router: router
});
