'use strict';

const validator = require('../middlewares/validator.js');
const ReserveController = require('../controllers/reserve.js');
const logger = require('winston');
const Joi = require('joi');
const authenticated = require('../middlewares/authenticated.js');

const reserveSchema = Joi.object().keys({
    token: Joi.string().required(),
    event_id: Joi.integer().required(),
    reserve: Joi.boolean().required()
});

const reserveRouter = (api) => {
    api.post('/users/reserve', [
        validator(loginSchema, 'body'),
        authenticated('body', UserModel.groups.STUDENT)
    ], ReserveController.reserve);
};