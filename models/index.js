'use strict';

const UserModel = require('./user.js');
const EventModel = require('./event.js');
const logger = require('winston');

// setup models and make relation between model
module.exports = (db) => {
    UserModel.load(db);
    EventModel.load(db);

    logger.info('Build relation between models');
    UserModel.dao.hasMany(EventModel.dao, {as: 'events', constraints: false});
    EventModel.dao.belongsTo(UserModel.dao, {as: 'user'});
}
