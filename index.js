'use strict';

global.LUKEE = {};

const System = require('./system');
const sys = new System();

sys.init();

// Start Servers
LUKEE.server.get('apiServer').start();
LUKEE.server.get('databaseServer').start();
