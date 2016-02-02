import Sequelize from 'sequelize';

const User = {
  model : null,
  load(db) {
    this.model = db.define('users', {
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
      groupId : {
        type : Sequelize.INTEGER,
        field : 'group_id'
      }
    });
  }
};

export default User;
