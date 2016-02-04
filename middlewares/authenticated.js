'use strict';

const UserModel = require('../models/user.js');
const logger = require('winston');

module.exports = (field, group_id) => {
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

        UserModel.findByToken(req[field].token)
            .then((user) => {
                if (user && group_id && group_id === user.group_id) {
                    req.user = user;
                    logger.info('User is authenticated and have the correct permission');
                    return next();
                }
                res.status(200).send(errMsg)
            })
            .catch(() => res.status(200).send(errMsg));
    };
}
