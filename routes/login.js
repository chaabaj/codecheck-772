import Validator from 'schema-validator';
import validatorMiddleware from '../middlewares/validator.js';
import loginHandler from '../controllers/login.js';

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
  api.post('/login', [ validatorMiddleware(loginValidator) ], loginHandler);
}

export default login;
