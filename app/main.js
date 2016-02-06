'use strict';

const express = require('express');
const cors = require('cors');
const config = require('../config/config.json');
const R = require('ramda');
const bodyParser = require('body-parser');
const logger = require('winston');
const Sequelize = require('sequelize');

/**
 * @desc setup the database
 * @returns {Object} database connection instance
 */
const configureDb = () => {
    const configBasePath = '../';

    logger.info('Configuring database...');
    return new Sequelize('database', 'username', '', {
        dialect: 'sqlite',
        logging: logger.info,
        storage: [configBasePath, config.database.connection.filename].join('/')
    });
}

/**
 * @desc entry point of the server application
 */
const main = () => {
    let api = express();
    let db = configureDb();
    let router = express.Router();
    const port = parseInt(config.host.split(':')[1], 10);

    api.use(bodyParser.json());
    api.use(bodyParser.urlencoded({extended: true}));
    api.use(cors());
    logger.info('Loading routes...');
    require('./routes/index.js')(router);
    logger.info('All routes are loaded');
    logger.info('Loading models...')
    require('./dao/index.js')(db);
    logger.info('All models are loaded');
    logger.info('Listening on port : ' + port);
    api.use('/api', router);
    db.sync().then(() => api.listen(port))
        .catch(logger.error);
};

logger.info('Starting server');
main();

/**
 * catch unCaughtException and report it
 */
process.on('uncaughtException', (err) => {
    logger.info('Fatal error : ' + err);
});
