'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Envelopes', [{
      name: 'Sport',
      budget: 50,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Courses',
      budget: 100,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Dancing',
      budget: 150,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Painting',
      budget: 200,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'tennis',
      budget: 45,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'gaming',
      budget: 1000,
      user_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Envelopes', null, {});
  }
};
