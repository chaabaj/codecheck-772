'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');

/**
 * @desc Attend data access layer
 * @type {{instance, load}}
 */
const AttendDao = {
    instance: null,
    load(db) {
        logger.info('Loading attend model definition...');
        this.instance = db.define('attends', {
            reserved_at: {
                type: Sequelize.DATE,
                field: 'reserved_at'
            }
        }, {
            timestamps: false,
            underscored: true
        });
        this.instance.removeAttribute('id');
    }
};

module.exports = AttendDao;