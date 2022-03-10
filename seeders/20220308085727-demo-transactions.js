'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Transactions', [{
      id: 1,
      payment_amount: 25,
      sender_envelope_id: 1,
      sender_user_id: 1,
      reciever_envelope_id: 2,
      reciever_user_id: 2,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      payment_amount: 10,
      sender_envelope_id: 3,
      sender_user_id: 2,
      reciever_envelope_id: 5,
      reciever_user_id: 3,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      payment_amount: 100,
      sender_envelope_id: 6,
      sender_user_id: 3,
      reciever_envelope_id: 4,
      reciever_user_id: 2,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 4,
      payment_amount: 25,
      sender_envelope_id: 5,
      sender_user_id: 3,
      reciever_envelope_id: 1,
      reciever_user_id: 1,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
