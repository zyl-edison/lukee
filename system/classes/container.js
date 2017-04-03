'use strict';

/**
 * Container Class
 *
 * The container class hold a dictionary(Object) that keeps track of all
 * components
 */
class Container {
  constructor(dict) {
    this.dict = dict || {};
  }

  get(name) {
    return this.dict[name] || null;
  }

  set(name, value) {
    const dictionary = this.dict;

    if (dictionary.hasOwnProperty(name)) {
      throw new Error(name + ' component exists.');
    }

    dictionary[name] = value;
  }

  all() {
    return this.dict;
  }
}

module.exports = Container;
