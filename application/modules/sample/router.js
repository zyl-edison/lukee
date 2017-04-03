'use strict';

const express = require('express');

module.exports = moduleName => {
  const mapper = LUKEE.helper.get('mapper');
  const router = express.Router();

  mapper.map({
    router: router,
    controller: LUKEE.controller.get(moduleName)
  });

  return router;
};
