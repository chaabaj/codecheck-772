

import UserModel from '../models/user.js';
import logger from 'winston';

const loginHandler = (req, res) => {
  logger.info('Handle login request');
  UserModel.login(req.body.email, req.body.password).then((user) => {
    logger.info('Success : ' + user);
    res.send(user);
  }).catch((err) => {
    logger.info('Error : ' + error);
    res.status(500).send(err);
  });
}

export default loginHandler;
