import Sequelize, { Model } from 'sequelize';

class Record extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.ENUM('day', 'week', 'month', 'year'),
        date: Sequelize.DATE,
        value: Sequelize.DECIMAL,
        description: Sequelize.STRING,
        recurrence: Sequelize.BOOLEAN,
        recurrence_time: Sequelize.INTEGER,
        recurrence_period: Sequelize.ENUM('day', 'week', 'month', 'year'),
        parceled: Sequelize.BOOLEAN,
        parceled_number: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
        account_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Group, { foreignKey: 'id', as: 'groups' });
    this.belongsTo(models.Account, {
      foreignKey: 'id',
      as: 'accounts',
    });
  }
}

export default Record;
