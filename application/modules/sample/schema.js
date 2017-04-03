'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = moduleName => {
  const collectionName = moduleName;

  return new Schema({
    name: String,
    age: Number
  }, {
    collection: collectionName
  });
};
