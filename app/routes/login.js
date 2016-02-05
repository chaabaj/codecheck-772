'use strict';

const validator = require('../middlewares/validator.js');
const LoginController = require('../controllers/login.js');
const logger = require('winston');
const Joi = require('joi');

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const loginRouter = (api) => {
    logger.info('Register login route');
    api.post('/auth/login', [validator(loginSchema, 'body')], LoginController.login);
}

module.exports = loginRouter;
