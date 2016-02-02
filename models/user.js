import Sequelize from 'sequelize';
import uuid from 'uuid';
import logger from 'winston';

const User = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      logger.info('Find user with email : ' + email);

      this.dao.findAll({
        where: {
          email : email,
          password : sha1(password)
        }
      })
      .then((user) => {
        logger.info('User found name : ' + user.name);
        user.token = uuid.v4();
        return user.save();
      })
      .then((user) => {
        resolve({
          code : 200,
          token : user.token,
          user : {
            id : user.id,
            name : user.name,
            group_id : user.group_id
          }
        });
      }).catch((err) => {
        logger.info('An error occured : ' + err);
        reject(err);
      });
    });
  },
  dao : null,
  load(db) {
    this.dao = db.define('users', {
      id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        field : "id"
      },
      name : {
        type : Sequelize.STRING,
        field : 'name'
      },
      password : {
        type : Sequelize.STRING,
        field : 'password'
      },
      email : {
        type : Sequelize.STRING,
        field : 'email'
      },
      group_id : {
        type : Sequelize.INTEGER,
        field : 'group_id'
      },
      token : {
        type : Sequelize.STRING,
        field : 'token'
      }
    });
  }
};

export default User;
