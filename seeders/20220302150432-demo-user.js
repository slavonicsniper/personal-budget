'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'j.smart',
      password: '$2b$10$1HTWckm4SbKoT4X6Or0ZtOwwrmBIj9pBpLqaaWVBeUI6BvOB5q1ZS', // change with your own hash
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: 'j.enigma',
      password: '$2b$10$s4CNtOwY2YNTtqUemaFjZePevWgInIHVokX..Sevq6SXWzJSjm5.2',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      username: 'bot',
      password: '$2b$10$WEQaO49kM7u9clsnUyry2.MuZAcWLd9HYgqckSXnsLBCwA7dKCfQG',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
