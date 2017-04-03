 'use strict';

const fs = require('fs');
const path = require('path');
const Container = require('./classes/container');

/**
 * System Class
 *
 * The system class is the core of the framework which register all core
 * components(classes and containers) into a the central location(LUKEE).
 *
 * There are 10 classes that developers can access
 *
 * Classes are:
 * - APIServer
 * - Configuration
 * - Container
 * - Controller
 * - DatabaseServer
 * - Helper
 * - HttpResonseError
 * - Logger
 * - Register
 * - Server
 *
 * There are 8 containers and each container contains responding instance.
 * To get an instance, use the following patten.
 *
 * LUKEE.<container name>.get(<instance name>);
 *
 * Containers are:
 * - config
 * - helper
 * - library
 * - schema
 * - model
 * - controller
 * - router
 * - server
 */
class System {
  constructor() {
    const rootPath = path.resolve(__dirname + '/..');
    const sysPath = this.sysPath = rootPath + '/system';
    const appPath = this.appPath = rootPath + '/application';

    this.classPath = sysPath + '/classes';
    this.modulePath = appPath + '/modules';

    this.containerNames = [
      'config',
      'server',
      'helper',
      'library',
      'schema',
      'model',
      'controller',
      'router'
    ];

    this.componentNames = {
      sys: [
        'helper',
        'library'
      ],
      app: [
        'config',
        'helper',
        'library',
        'server'
      ]
    };
  }

  /**
   * Register all classes into the central location and use class.name as the
   * key
   */
  registerClasses() {
    const classPath = this.classPath;

    this.getJsFiles(classPath).forEach(fileName => {
      const cls = require(classPath + '/' + fileName);
      LUKEE[cls.name] = cls;
    });
  }

  /**
   * Register all containers into the central location based on the
   * containerNames
   */
  registerContainers() {
    this.containerNames.forEach(name => {
      LUKEE[name] = new Container();
    });
  }

  /**
   * Add all system level components into their coresponding containers based
   * on the componentNames
   */
  registerComponents() {
    const componentNames = this.componentNames;

    this.addComponents(this.sysPath, componentNames.sys);
    this.addComponents(this.appPath, componentNames.app);
  }

  addComponents(path, componentNames) {
    componentNames.forEach(compName => {
      const componentPath = path + '/' + compName;

      this.getJsFiles(componentPath).forEach(fileName => {
        const component = require(componentPath + '/' + fileName);

        LUKEE[compName].set(component.name, component.value);
      });
    });
  }

  /**
   * Add all components in application modules into their coresponding
   * containers
   */
  registerModules() {
    const modulePath = this.modulePath;
    const moduleComponentNames = [ 'schema', 'model', 'controller', 'router' ];

    fs.readdirSync(modulePath)
      .filter(file => fs.statSync(path.join(modulePath, file)).isDirectory())
      .forEach(directory => {
        const modDir = modulePath + '/' + directory;
        const mod = require(modDir);

        moduleComponentNames.forEach(modCompName => {
          LUKEE[modCompName].set(mod.name, mod.value[modCompName](mod.name));
        });
      });
  }

  getJsFiles(path) {
    return fs.readdirSync(path).filter(fileName => /.js$/.test(fileName));
  }

  init() {
    this.registerClasses();
    this.registerContainers();
    this.registerComponents();
    this.registerModules();
  }
}

module.exports = System;
