'use strict';

const validator = require('../middlewares/validator.js');
const EventController = require('../controllers/event.js');
const UserModel = require('../models/user.js');
const authenticated = require('../middlewares/authenticated.js');
const logger = require('winston');
const R = require('ramda');
const Joi = require('joi');

const searchEventSchema = Joi.object().keys({
    from: Joi.date().format('YYYY-MM-DD').required(),
    offset: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1)
});

const searchCompanyEventSchema = searchEventSchema.keys({
   token : Joi.string().required()
});

const parseData = (field) => {
    return (req, res, next) => {
        logger.info('Parse event params query');
        if (req[field].offset) {
            req[field].offset = parseInt(req.query.offset, 10);
        }
        if (req[field].limit) {
            req[field].limit = parseInt(req.query.limit, 10);
        }
        next();
    };
}

const eventRouter = (api) => {
    logger.info('Register event routes');
    api.get('/users/events', [
            parseData('query'),
            validator(searchEventSchema, 'query')
        ],
        EventController.list);
    api.post('/companies/events', [
            parseData('body'),
            validator(searchCompanyEventSchema, 'body'),
            authenticated('body', UserModel.groups.COMPANY)
        ],
        EventController.listCompanyEvents);
}

module.exports = eventRouter;
