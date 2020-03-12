import Sequelize from 'sequelize';

import User from '../app/models/User';
import Avatar from '../app/models/Avatar';
import UserGroups from '../app/models/UserGroups';

import databaseConfig from '../config/database';

const models = [User, Avatar, UserGroups];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
