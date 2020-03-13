import Sequelize, { Model } from 'sequelize';

class Groups extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Groups;
