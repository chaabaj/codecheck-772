import express from 'express';
import cors from 'cors';
import config from './config/config.json';
import fs from 'fs';
import R from 'ramda';
import bodyParser from 'body-parser';
import logger from 'winston';
import Sequelize from 'sequelize';


const configureDb = () => {
  logger.info('Configuring database...');
  return new Sequelize('database', 'username', '', {
    dialect : 'sqlite',
    logging: console.log,
    storage : config.database.connection.filename
  });
}

const main = () => {
  let api = express();
  let db = configureDb();
  let router = express.Router();
  const routeFiles = fs.readdirSync('./routes');
  const modelFiles = fs.readdirSync('./models');
  const port = parseInt(config.host.split(':')[1], 10);

  api.use(bodyParser.json());
  api.use(bodyParser.urlencoded());
  api.use(cors());
  logger.info('Loading routes...');
  R.forEach((routeFile) => {
    var route = require('./routes/' + routeFile);

    logger.info('Loading route : ' + routeFile);
    route(router);
    logger.info('Route : ' + routeFile + ' loaded');
  }, routeFiles);
  logger.info('All routes are loaded');
  logger.info('Loading models...')
  R.forEach((modelFile) => {
    const model = require('./models/' + modelFile);

    logger.info('Load model : ' + modelFile);
    model.load(db);
    logger.info('Model : ' + modelFile + ' loaded');
  }, modelFiles);
  logger.info('All models are loaded');
  logger.info('Listening on port : ' + port);
  api.use('/api', router);
  db.sync().then(() => api.listen(port))
           .catch(logger.error);
};

logger.info('Starting server');
main();

process.on('uncaughtException', (err) => {
  logger.info('Fatal error : ' + err);
});
