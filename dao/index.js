'use strict';

const UserDao = require('./user.js');
const EventDao = require('./event.js');
const AttendDao = require('./attend.js');
const logger = require('winston');

// setup models and make relation between model
module.exports = (db) => {
    UserDao.load(db);
    EventDao.load(db);
    AttendDao.load(db);

    logger.info('Build relation between models');
    UserDao.instance.hasMany(EventDao.instance, {as: 'events', constraints: false});
    EventDao.instance.belongsTo(UserDao.instance, {as: 'user'});
    AttendDao.instance.belongsTo(UserDao.instance, {as : 'user'});
    AttendDao.instance.belongsTo(EventDao.instance, {as : 'event'});
}