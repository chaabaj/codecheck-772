'use strict';

const loginRoute = require('./login.js');
const eventRoute = require('./event.js');

module.exports = (router) => {
  loginRoute(router);
  eventRoute(router);
}
