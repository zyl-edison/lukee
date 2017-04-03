'use strict';

const mongoose = require('mongoose');

module.exports = moduleName => {
  const collectionName = moduleName;
  const SampleSchema = LUKEE.schema.get(moduleName);

  return mongoose.model(collectionName, SampleSchema);
};
