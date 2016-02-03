'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');

const EventDao = {
    instance : null,
    load(db) {
        logger.info('Loading definition of event model');
        this.instance = db.define('events', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'id'
            },
            name: {
                type: Sequelize.STRING,
                field: 'name'
            },
            start_date: {
                type: Sequelize.DATE,
                field: 'start_date'
            }
        }, {
            timestamps: false,
            underscored: true
        });
    }
};

module.exports = EventDao;