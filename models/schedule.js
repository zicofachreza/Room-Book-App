'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Room, {foreignKey: 'RoomId'})
      Schedule.belongsTo(models.User, {foreignKey: 'UserId'})
    }

    formattedCheckIn() {
      return this.checkIn.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      })
    }

    formattedCheckOut() {
      return this.checkOut.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
      })
    }
  }
  Schedule.init({
    ordererName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required.'
        },
        notEmpty: {
          msg: 'Name is required.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required.'
        },
        notEmpty: {
          msg: 'Email is required.'
        }
      }
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check In is required.'
        },
        notEmpty: {
          msg: 'Check In is required.'
        }
      }
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Check Out is required.'
        },
        notEmpty: {
          msg: 'Check Out is required.'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    RoomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};