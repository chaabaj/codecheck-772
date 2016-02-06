'use strict';

//const UserModel = require('../models/user.js');
const logger = require('winston');
const EventModel = require('../models/event.js');
const AttendModel = require('../models/attend.js');
const R = require('ramda');

/**
 * @desc generate an mapping between AttendModel error codes and controller codes
 * @returns {{}}
 * @private
 */
const _attendErrorTable = () => {
    let errorCodes = {};

    errorCodes[AttendModel.ErrorCodes.ALREADY_RESERVED] = 501;
    errorCodes[AttendModel.ErrorCodes.NOT_RESERVED] = 502;
    return errorCodes;
}();

const ReserveController = {
    _getErrorCode(err) {
        if (err.type) {
            return _attendErrorTable[err.type];
        }
        return 500;
    },
    redirect(req, res) {
        logger.info('retreive event and redirect to the correct method');
        EventModel.findById(req.body.event_id)
            .then((event) => {
                logger.info('Retreived event');
                if (req.body.reserve === 'true') {
                    logger.info('reserve an event');
                    return ReserveController.handle(res, 'reserve', req.user, event, 'Reserved');
                }
                logger.info('unreserve an event');
                return ReserveController.handle(res, 'unreserve', req.user, event, 'Reserved');
            }).catch((err) => {
                res.send({
                    code: 404,
                    msg: 'No such event'
                });
            });

    },
    handle(res, method, user, event, msg) {
        logger.info('Handle reserve request');
        AttendModel[method](user, event)
            .then(() => {
                res.send({
                    code: 200,
                    message: 'Reserved'
                });
            })
            .catch((err) => {
                res.send({
                    code : ReserveController._getErrorCode(err),
                    message : 'An error occured check the error code'
                });
            });
    }
}

module.exports = ReserveController;