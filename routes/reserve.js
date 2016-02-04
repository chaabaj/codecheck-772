'use strict';

const logger = require('winston');
const Joi = require('joi');
const authenticated = require('../middlewares/authenticated.js');
const validator = require('../middlewares/validator.js');
const ReserveController = require('../controllers/reserve.js');
const UserModel = require('../models/user.js');

const reserveSchema = Joi.object().keys({
    token: Joi.string().required(),
    event_id: Joi.number().integer().required(),
    reserve: Joi.boolean().required()
});


const reserveRouter = (api) => {
    logger.info('Register reserve route');
    api.post('/users/reserve', [
        validator(reserveSchema, 'body'),
        authenticated('body', UserModel.groups.STUDENT)
    ], ReserveController.redirect);
};

module.exports = reserveRouter;