import Sequelize from 'sequelize';

import User from '../app/models/User';
import Avatar from '../app/models/Avatar';
import Group from '../app/models/Group';
import Account from '../app/models/Account';
import Category from '../app/models/Category';
import SubCategory from '../app/models/SubCategory';

import databaseConfig from '../config/database';

const models = [User, Avatar, Group, Account, Category, SubCategory];

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
