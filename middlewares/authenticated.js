'use strict';

const UserModel = require('../models/user.js');

module.exports = () => {
  return (req, res, next) => {
    if (!req.headers.authorization) {
      return res.send(401, {
        msg : "Not authorized";
      });
    }
    User.findOne(req.headers.authorization)
        .then((user) => next())
        .catch(() => res.status(403).end());
  };
}
