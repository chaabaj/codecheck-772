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

const parseData = (req, res, next) => {
    if (req.query.offset) {
        req.query.offset = parseInt(req.query.offset, 10);
    }
    if (req.query.limit) {
        req.query.limit = parseInt(req.query.limit, 10);
    }
    next();
};

const eventRouter = (api) => {
    logger.info('Register event routes');
    api.get('/users/events', [
            parseData,
            validator(searchEventSchema, 'query')
        ],
        EventController.list);
    api.post('/api/companies/events', [
            parseData,
            validator(searchCompanyEventSchema, 'query'),
            authenticated('body', UserModel.groups.COMPANY)
        ],
        EventController.listCompanyEvents);
}

module.exports = eventRouter;
