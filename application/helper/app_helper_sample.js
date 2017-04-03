'use strict';

const appHelperSample = new LUKEE.Helper({
  fn1: () => {},
  fn2: () => {}
});

module.exports = new LUKEE.Register('appHelperSample', appHelperSample);
