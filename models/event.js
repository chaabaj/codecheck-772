'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');
const R = require('ramda');


const EventModel = {
    dao: null,
    _resolveCompanies(events) {
        return Promise.all(R.map((event) => {
            return new Promise((resolve, reject) => {
                event.getUser().then((company) => {
                    event.company = company;
                    resolve(event);
                })
                    .catch(reject);
            });
        }, events));
    },
    search(startDate, opts) {
        console.log('searching with limit : ' + opts.limit + ' offset : ' + opts.offset);
        return new Promise((resolve, reject) => {
            EventModel.dao.findAll({
                limit: opts.limit,
                offset: opts.offset,
                where: {
                    start_date: {
                        $gte: startDate
                    }
                },
                order: 'start_date ASC'
            })
                .then(EventModel._resolveCompanies)
                .then((events) => {
                    resolve(R.map((event) => {
                        return {
                            id: event.id,
                            name: event.name,
                            start_date: event.start_date,
                            company: {
                                id: event.company.id,
                                name: event.company.name
                            }
                        };
                    }, events));
                })
                .catch((err) => {
                    console.info(err);
                    reject(err);
                });
        });
    },
    load(db) {
        logger.info('Loading definition of event model');
        this.dao = db.define('events', {
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
}

module.exports = EventModel;
