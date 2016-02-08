'use strict';

const Sequelize = require('sequelize');
const uuid = require('uuid');
const logger = require('winston');
const sha1 = require('sha1');
const UserDao = require('../dao/user.js');
const userStorage = require('../storage/users.js');
const R = require('ramda');

/**
 * @desc user model for login and searching user
 * @type {{groups: {STUDENT: number, COMPANY: number}, login, findById}}
 */
const UserModel = {
    groups: {
        STUDENT: 1,
        COMPANY: 2
    },
    login(email, password) {
        return new Promise((resolve, reject) => {
            logger.info('Find user with email : ' + email);
            UserDao.instance.findOne({
                where: {
                    email: email,
                    password: sha1(password)
                }
            }).then((user) => {
                if (!user) {
                    throw 'Email or password is incorrect';
                }
                logger.info('User found name : ' + user.name);
                user.token = uuid.v4();
                userStorage[user.token] = user.id;
                return user;
            }).then((user) => {
                resolve({
                    code: 200,
                    token: user.token,
                    user: {
                        id: user.id,
                        name: user.name,
                        group_id: user.group_id
                    }
                });
            }).catch((err) => reject(err));
        });
    },
    findById(id) {
        return new Promise((resolve, reject) => {
            UserDao.instance.findOne({
                where: {
                    id: id
                }
            }).then((user) => !R.isNil(user) ? resolve(user) : reject(user))
              .catch((err) => reject(err));
        });

    }
};

module.exports = UserModel;
