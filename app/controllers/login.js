'use strict';

const UserModel = require('../models/user.js');
const logger = require('winston');

const LoginController = {
    login(req, res) {
        logger.info('Handle login request');
        UserModel.login(req.body.email, req.body.password)
            .then((user) => {
                logger.info('Success send response to client');
                res.send(user);
            }).catch((err) => {
                logger.info('Send error back to client : ' + err);
                res.send({
                    code: 500,
                    msg: err
                });
            });
    }
}

module.exports = LoginController;
