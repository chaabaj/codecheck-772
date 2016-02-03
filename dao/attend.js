'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');

const AttendDao = {
    instance: null,
    load(db) {
        this.instance = db.define('attends', {
            id: {
                type: Sequelize.INTEGER,
                field: 'id',
                primaryKey: true
            },
            reserved_at: {
                type: Sequelize.DATE,
                field: 'reserved_at'
            }
        }, {
            timestamps: false,
            underscored: true
        });
    }
};

module.exports = AttendDao;