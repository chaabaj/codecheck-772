'use strict';

const EventModel = require('../models/event.js');
const logger = require('winston');
const moment = require('moment');

const EventController = {
    list(req, res) {
        const opts = {
            offset: req.query.offset || 0,
            limit: req.query.limit || undefined
        };
        const dateFrom = moment(req.query.from, 'YYYY-MM-DD').toDate();


        logger.info('Handle list event list request');
        EventModel.search(dateFrom, opts).then((events) => {
            res.send({
                code: 200,
                events: events
            })
        }).catch((err) => {
            res.send({
                code: 500,
                msg: 'Cannot retreive events'
            });
        });
    }
}

module.exports = EventController;
