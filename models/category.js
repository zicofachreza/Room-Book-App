'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Room, {foreignKey: 'CategoryId'})
    }
  }
  Category.init({
    name: DataTypes.STRING,
    imageURL: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};