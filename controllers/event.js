import EventModel from '../models/event.js';
import filterObj from '../utils/filter-object.js';

const EventController = {
  list(req, res) {
    const opts = {
      offset : req.body.offset || 0,
      limit : req.body.limit || undefined
    };

    EventModel.search(req.body.from, searchOpts)
              .then((events) => res.send(events))
              .catch((err) => res.send({
                code : 500,
                msg : 'Cannot retreive events'
              });
  }
}
