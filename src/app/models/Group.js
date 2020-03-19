import Sequelize, { Model } from 'sequelize';

class Group extends Model {
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

  static associate(models) {
    this.hasMany(models.Account, { foreignKey: 'group_id', as: 'accounts' });
    this.belongsToMany(models.User, {
      foreignKey: 'group_id',
      through: 'user_groups',
      as: 'users',
    });
  }
}

export default Group;
