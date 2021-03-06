'use strict';

const validator = require('../middlewares/validator.js');
const EventController = require('../controllers/event.js');
const UserModel = require('../models/user.js');
const authenticated = require('../middlewares/authenticated.js');
const logger = require('winston');
const Joi = require('joi');

/**
 * @desc search event schema for event search request validation
 */
const searchEventSchema = Joi.object().keys({
    from: Joi.date().format('YYYY-MM-DD').required(),
    offset: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1)
});

/**
 * @desc search company event schema for company search event request validation
 */
const searchCompanyEventSchema = searchEventSchema.keys({
    token: Joi.string().required()
});

/**
 * @desc parse request param for event search
 * @param field field in the request where is the request parameters
 * @returns {Function}
 */
const parseData = (field) => {
    return (req, res, next) => {
        if (req[field].offset) {
            req[field].offset = parseInt(req[field].offset, 10);
        }
        if (req[field].limit) {
            req[field].limit = parseInt(req[field].limit, 10);
        }
        next();
    };
}

/**
 * @desc register event search routes in the API
 * @param api
 */
const eventRouter = (router) => {
    logger.info('Register event routes');
    router.get('/users/events', [
            parseData('query'),
            validator(searchEventSchema, 'query')
        ],
        EventController.list);
    router.post('/companies/events', [
            parseData('body'),
            validator(searchCompanyEventSchema, 'body'),
            authenticated('body', UserModel.groups.COMPANY)
        ],
        EventController.listCompanyEvents);
}

module.exports = eventRouter;
