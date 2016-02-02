
import sha1 from 'sha1';
import User from '../models/user.js';

const loginHandler = (req, res) => {
  const passwordHash = sha1(req.body.password);
  const promise = User.model.findOne({
    email : req.body.email,
    password : passwordHash
  });
  promise.then((user) => res.send(user));
  promise.catch((err) => {
    res.statusCode = 403;
    res.send({
      msg : 'Email or password does not match'
    });
  });
}

export default loginHandler;
