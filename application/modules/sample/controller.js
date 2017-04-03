'use strict';

module.exports = moduleName => {
  const SampleModel = LUKEE.model.get(moduleName);
  const logger = new LUKEE.Logger();

  return new LUKEE.Controller(SampleModel, logger);
};
