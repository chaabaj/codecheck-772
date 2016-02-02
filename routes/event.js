'use strict';

const validatorMiddleware = require('../middlewares/validator.js');
const EventController = require('../controllers/event.js');
const logger = require('winston');
const Joi = require('joi');

const searchEventSchema = Joi.object().keys({
  from : Joi.string().regex(/[0-9]{4}-[0-9]{2}-[0-9]{2}/).required(),
  offset : Joi.number().integer().min(0),
  limit : Joi.number().integer().min(1)
});

const parseOffsetAndLimit = (req, res, next) => {
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
  api.get('/users/events',
           [ parseOffsetAndLimit,
             validatorMiddleware(searchEventSchema, 'query')],
           EventController.list);
}

module.exports = eventRouter;
