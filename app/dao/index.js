'use strict';

const UserDao = require('./user.js');
const EventDao = require('./event.js');
const AttendDao = require('./attend.js');
const logger = require('winston');

/**
 * @desc Setup dao and build relationship between them
 */
module.exports = (db) => {
    UserDao.load(db);
    EventDao.load(db);
    AttendDao.load(db);

    logger.info('Build relation between models');
    UserDao.instance.hasMany(EventDao.instance, { as: 'events'});
    UserDao.instance.hasMany(AttendDao.instance, { as : 'attendees' });
    EventDao.instance.hasMany(AttendDao.instance, { as : 'attendees' });
    EventDao.instance.belongsTo(UserDao.instance, { as: 'user', constraints : false });
    AttendDao.instance.belongsTo(UserDao.instance, { as : 'user', constraints : false });
    AttendDao.instance.belongsTo(EventDao.instance, { as : 'event', constraints : false });
};