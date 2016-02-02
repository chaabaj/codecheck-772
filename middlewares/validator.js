'use strict';

const logger = require('winston');
const Joi = require('joi');

module.exports = (schema, field) => {
  return (req, res, next) => {
    Joi.validate(req[field], schema, (err) => {
      if (err) {
        logger.info('error validation');
        return res.status(400).end();
      }
      next();
    });
  };
}
