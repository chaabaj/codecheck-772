import Validator from 'schema-validator';
import validatorMiddleware from '../middlewares/validator.js';
import LoginController from '../controllers/login.js';
import logger from 'winston';

const loginValidator = new Validator({
  email : {
    type : String,
    required : true,
    test : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  },
  password : {
    type : String,
    required : true
  }
});

const login = (api) => {
  logger.info('Register login route');
  api.post('/auth/login',
           [ validatorMiddleware(loginValidator) ],
           LoginController.login);
}

export default login;
