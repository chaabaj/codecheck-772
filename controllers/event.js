'use strict';

const EventModel = require('../models/event.js');
const logger = require('winston');

const EventController = {
  list(req, res) {
    const opts = {
      offset : req.body.offset || 0,
      limit : req.body.limit || undefined
    };

    logger.info('Handle list event request with opts : ' + req.body);
    EventModel.search(req.body.from, opts)
              .then((events) => res.send(events))
              .catch((err) => {
                res.send({
                  code : 500,
                  msg : 'Cannot retreive events'
                });
              });
  }
}

module.exports = EventController;
