'use strict';

const databaseConfig = LUKEE.config.get('databaseConfig');

const databaseServer = new LUKEE.DatabaseServer(databaseConfig);

module.exports = new LUKEE.Register('databaseServer', databaseServer);
