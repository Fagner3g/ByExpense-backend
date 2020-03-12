import Sequelize, { Model } from 'sequelize';

class UserGroups extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        code: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default UserGroups;
