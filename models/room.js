'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      Room.hasMany(models.Schedule, {foreignKey: 'RoomId'})
    }

    get mergeName() {
      if (this.floor === 1) return `${this.name} (${this.floor}st Floor)`
      else if (this.floor === 2) return `${this.name} (${this.floor}nd Floor)`
      else if (this.floor === 3) return `${this.name} (${this.floor}rd Floor)`
      else if (this.floor === 4) return `${this.name} (${this.floor}th Floor)`
    }

    static async readRoom(status, status2) {
      let option = {
        include: {
            model: sequelize.models.Category
          }
      }

      if (status) option.order = [['CategoryId', 'desc']]
      if (status2) option.order = [['CategoryId']]

      return await Room.findAll(option)
    }
  }
  Room.init({
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    floor: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};