import Sequelize from 'sequelize';
import logger from 'winston';

const EventModel = {
  dao : null,
  search(startDate, opts) {
    return new Promise((resolve, reject) => {
      EventModel.dao.findAll({
        limit : opts.limit,
        offset : opts.offset,
        where : {
          start_date : {
            $ge : startDate
          }
        },
        order : 'start_date ASC'
      });
    });
  },
  load(db) {
    logger.info('Loading definition of event model');
    this.dao = db.define('events', {
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        field : 'id'
      },
      name : {
        type : Sequelize.STRING,
        field : 'name'
      },
      start_date : {
        type : Sequelize.DATE,
        field : 'start_date'
      }
    }, {
      timestamps : false
    });
  }
}

export default EventModel;
