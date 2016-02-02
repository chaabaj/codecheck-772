

import UserModel from '../models/user.js';
import logger from 'winston';

const LoginController = {
  login(email, password) {
    logger.info('Handle login request');
    UserModel.login(req.body.email, req.body.password)
      .then((user) => {
        logger.info('Success send response to client');
        res.send(user);
      }).catch((err) => {
        logger.info('Send error back to client : ' + err);
        res.send({
          code : 500,
          msg : err
        });
      });
  }
}

export default LoginController;
