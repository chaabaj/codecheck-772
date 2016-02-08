'use strict';

const validator = require('../middlewares/validator.js');
const LoginController = require('../controllers/login.js');
const logger = require('winston');
const Joi = require('joi');

/**
 * @desc login schema for request validation
 */
const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

/**
 * @desc register login route in the API
 * @param api
 */
const loginRouter = (router) => {
    logger.info('Register login route');
    router.post('/auth/login', [validator(loginSchema, 'body')], LoginController.login);
}

module.exports = loginRouter;
