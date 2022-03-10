'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      payment_amount: {
        type: Sequelize.DECIMAL
      },
      sender_envelope_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Envelopes',
          key: 'id'
        }
      },
      reciever_envelope_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Envelopes',
          key: 'id'
        }
      },
      sender_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      reciever_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};