import Sequelize, { Model } from 'sequelize';

class SubCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        group_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Group, {
      foreignKey: 'category_id',
      as: 'groups',
    });
    this.hasMany(models.Category, {
      foreignKey: 'sub_category_id',
      as: 'categories',
    });
  }
}

export default SubCategory;
