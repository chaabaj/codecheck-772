'use strict';

const UserModel = require('../models/user.js');

module.exports = (field, group_id) => {
    return (req, res, next) => {
        if (!req[field].token) {
            return res.status(401).send({
                msg: "Not authorized"
            });
        }
        UserModel.findByToken(req[field].token)
            .then((user) => {
                if (user && group_id && group_id === user.group_id) {
                    req.user = user;
                    return next();
                }
                res.status(401)
            })
            .catch(() => res.status(403).end());
    };
}
