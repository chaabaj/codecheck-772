'use strict';

const UserModel = require('../models/user.js');
const logger = require('winston');
const userStorage = require('../storage/users.js');

/**
 * @desc build an function for checking if an user is authenticated
 * @param field
 * @param groupId
 * @returns {Function} function to be used to check if the user is authenticated
 */
module.exports = (field, groupId) => {
    return (req, res, next) => {
        const errMsg = {
            code : 401,
            message : 'Forbidden access'
        };

        if (!req[field].token) {
            return res.status(401).send({
                message: "Not authorized"
            });
        }
        const userId = userStorage[req[field].token];

        if (!userId) {
            logger.info('User not logged');
            return res.send(errMsg);
        }

        UserModel.findById(userId)
            .then((user) => {
                if (groupId && groupId === user.group_id) {
                    req.user = user;
                    logger.info('User is authenticated and have the correct permission');
                    return next();
                }
                res.send(errMsg)
            })
            .catch(() => res.send(errMsg));
    };
}
