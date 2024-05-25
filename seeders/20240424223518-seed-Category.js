'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataCategory = require('../data/categories.json').map(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      
      return el
    })
    await queryInterface.bulkInsert('Categories', dataCategory, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
