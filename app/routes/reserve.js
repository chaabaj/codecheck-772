'use strict';

const logger = require('winston');
const Joi = require('joi');
const authenticated = require('../middlewares/authenticated.js');
const validator = require('../middlewares/validator.js');
const ReserveController = require('../controllers/reserve.js');
const UserModel = require('../models/user.js');

/**
 * @desc reserve schema for request validation
 */
const reserveSchema = Joi.object().keys({
    token: Joi.string().required(),
    event_id: Joi.number().integer().required(),
    reserve: Joi.boolean().required()
});


/**
 * @desc register reserve route in the API
 * @param api
 */
const reserveRouter = (router) => {
    logger.info('Register reserve route');
    router.post('/users/reserve', [
        validator(reserveSchema, 'body'),
        authenticated('body', UserModel.groups.STUDENT)
    ], ReserveController.redirect);
};

module.exports = reserveRouter;