'use strict';

const Sequelize = require('sequelize');
const logger = require('winston');
const R = require('ramda');
const EventDao = require('../dao/event.js');
const UserDao = require('../dao/user.js');
const AttendDao = require('../dao/attend.js');


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
                include: [
                    {
                        model: UserDao.instance,
                        as: 'user'
                    },
                    {
                        model: AttendDao.instance,
                        as: 'attendees',
                        attributes : [[Sequelize.fn('count', Sequelize.col('attendees.event_id')), 'count']]
                    }
                ],
                group : ['events.id'],
                order: 'start_date ASC'
            }).then((events) => {
                events = events.filter((event) => event.user != null);
                resolve(events.map((event) => {
                    return {
                        id: event.id,
                        name: event.name,
                        start_date: event.start_date,
                        company: {
                            id: event.user.id,
                            name: event.user.name
                        },
                        number_of_attendees : event.attendees[0].dataValues.count
                    };
                }));
            }).catch((err) => {
                reject(err);
            });
        });
    },
    findById(eventId) {
        return new Promise((resolve, reject) => {
            EventDao.instance.findOne({
                where: {
                    id: eventId
                }
            }).then((event) => {
                if (event) {
                    return resolve(event);
                }
                throw { type : 'NOT_FOUND' };
            }).catch((err) => {
                logger.info(err);
                reject(err);
            });
        });
    }
}

module.exports = EventModel;
