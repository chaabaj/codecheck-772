'use strict';

const logger = require('winston');
const Joi = require('joi');

/**
 * @desc generate a validation function depend on field to check in the request
 * @param schema
 * @param field
 * @returns {Function} function to be used for schema validation
 */
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
