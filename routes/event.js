import Validator from 'schema-validator';
import validatorMiddleware from '../middlewares/validator.js';
import EventController from '../controllers/event.js';

const searchEventValidator = new Validator({
  from : {
    type : Date,
    required : true,
  },
  offset : {
    type : Number,
    min : 0
  },
  limit : {
    type : Number,
    min : 1
  }
});

const login = (api) => {
  logger.info('Register event routes');
  api.get('/auth/users/events',
           [ validatorMiddleware(searchEventValidator) ],
           EventController.list);
}

export default login;
