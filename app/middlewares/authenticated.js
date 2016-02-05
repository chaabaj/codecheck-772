'use strict';

const UserModel = require('../models/user.js');
const logger = require('winston');
const userStorage = require('../storage/users.js');

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
                if (user && groupId && groupId === user.group_id) {
                    req.user = user;
                    logger.info('User is authenticated and have the correct permission');
                    return next();
                }
                res.send(errMsg)
            })
            .catch(() => res.send(errMsg));
    };
}
