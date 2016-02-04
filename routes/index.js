'use strict';

const loginRoute = require('./login.js');
const eventRoute = require('./event.js');
const reserveRoute = require('./reserve.js');

module.exports = (router) => {
    loginRoute(router);
    eventRoute(router);
    reserveRoute(router);
}
