import Sequelize, { Model } from 'sequelize';

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'id', as: 'groups' });
  }
}

export default Account;
