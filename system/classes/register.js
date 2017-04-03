'use strict';

/**
 * Register Class
 *
 * System will use register instance to add all components to the central
 * location
 */
class Register {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

module.exports = Register;
