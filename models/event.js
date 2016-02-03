'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');
const R = require('ramda');
const EventDao = require('../dao/event.js');
const UserDao = require('../dao/user.js');


const EventModel = {
    search(startDate, opts) {
        console.log('searching with limit : ' + opts.limit + ' offset : ' + opts.offset);
        return new Promise((resolve, reject) => {
            const searchParams = {
                start_date: {
                    $gte: startDate,
                }
            };

            if (opts.user) {
                searchParams.user_id = opts.user.id;
            }
            EventDao.instance.findAll({
                limit: opts.limit,
                offset: opts.offset,
                where: searchParams,
                include : [{ model : UserDao.instance, as : 'user' }],
                order: 'start_date ASC'
            })
                .then((events) => {
                    resolve(R.map((event) => {
                        return {
                            id: event.id,
                            name: event.name,
                            start_date: event.start_date,
                            company: {
                                id: event.user.id,
                                name: event.user.name
                            }
                        };
                    }, events));
                })
                .catch((err) => {
                    console.info(err);
                    reject(err);
                });
        });
    }
}

module.exports = EventModel;
