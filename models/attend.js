'use strict';

const AttendDao = require('../dao/attend.js');
const logger = require('winston');

const AttendModel = {
    ErrorCodes : {
        ALREADY_RESERVED : 1,
        NOT_RESERVED : 2
    },
    _checkIfAlreadyAttend(user, event) {
        return new Promise((resolve, reject) => {
            AttendDao.instance.findAll({
                where: {
                    user_id: user.id,
                    event_id: event.id
                }
            })
                .then((attend) => resolve(attend.length > 0))
                .catch((err) => reject(err));
        });
    },
    reserve(user, event) {
        logger.info('try reserve an event');
        return new Promise((resolve, reject) => {
            AttendModel._checkIfAlreadyAttend(user, event)
                .then((attended) => {
                    logger.info('Check if the event is already reserve by the user');
                    if (attended) {
                        throw { type : AttendModel.ErrorCodes.ALREADY_RESERVED };
                    }
                    logger.info('Create a reservation for the user');
                    return AttendDao.instance.create({
                        event_id: event.id,
                        user_id: user.id
                    });
                })
                .then(resolve)
                .catch(reject);
        });
    },
    unreserve(user, event) {
        return new Promise((resolve, reject) => {
            AttendModel._checkIfAlreadyAttend(user, event)
                .then((attended) => {
                    logger.info('Check if the user reserved for the event');
                    if (!attended) {
                        throw { type : AttendModel.ErrorCodes.NOT_RESERVED };
                    }
                    logger.info('Remove the reservation');
                    return AttendDao.instance.destroy({
                        where : {
                            user_id : user.id,
                            event_id : event.id
                        }
                    });
                })
                .then(resolve)
                .catch(reject);
        });
    }
};

module.exports = AttendModel;