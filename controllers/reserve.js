'use strict';

//const UserModel = require('../models/user.js');
const logger = require('winston');

const ReserveController = {
    reserve(req, res) {
        logger.info('Handle reserve request');
        res.end();
    }
}

module.exports = ReserveController;