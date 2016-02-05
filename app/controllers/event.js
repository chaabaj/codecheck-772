'use strict';

const EventModel = require('../models/event.js');
const logger = require('winston');
const moment = require('moment');

const EventController = {
    _setup(params) {
        return {
          opts : {
              offset : params.offset || 0,
              limit : params.limit || undefined
          },
          dateFrom : moment(params.from, 'YYYY-MM-DD').hours(0).minutes(0).toDate()
        };
    },
    list(req, res) {
        const params = EventController._setup(req.query);

        logger.info('Handle list event list request');
        logger.info(params);
        EventModel.search(params.dateFrom, params.opts).then((events) => {
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
    },
    listCompanyEvents(req, res) {
        const params = EventController._setup(req.body);

        params.opts.user = req.user;
        logger.info('Handle company list event list request');
        EventModel.search(params.dateFrom, params.opts).then((events) => {
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
