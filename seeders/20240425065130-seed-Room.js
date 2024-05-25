'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataRoom = require('../data/rooms.json').map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      
      return el
    })
    await queryInterface.bulkInsert('Rooms', dataRoom, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rooms', null, {})
  }
};
