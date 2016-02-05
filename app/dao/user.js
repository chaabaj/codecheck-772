'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');

const UserDao = {
    instance : null,
    load(db) {
        logger.info('Loading user model definiton...');
        this.instance = db.define('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: "id"
            },
            name: {
                type: Sequelize.STRING,
                field: 'name'
            },
            password: {
                type: Sequelize.STRING,
                field: 'password'
            },
            email: {
                type: Sequelize.STRING,
                field: 'email'
            },
            group_id: {
                type: Sequelize.INTEGER,
                field: 'group_id'
            }
        }, {
            timestamps: false,
            underscored: true
        });
    }
};

module.exports = UserDao;
