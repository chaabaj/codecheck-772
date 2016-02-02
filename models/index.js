import UserModel from './user.js';
import EventModel from './event.js';
import logger from 'winston';

// setup models and make relation between model
export default function(db) {
  UserModel.load(db);
  EventModel.load(db);

  logger.info('Build relation between models');
  UserModel.dao.hasMany(EventModel.dao, { as : 'events', constraints : false });
  EventModel.dao.hasOne(UserModel.dao, { as : 'user' });
}
