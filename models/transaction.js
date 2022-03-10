'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Envelope, { foreignKey: 'sender_envelope_id', as: 'sender_envelope'})
      Transaction.belongsTo(models.Envelope, { foreignKey: 'reciever_envelope_id', as: 'reciever_envelope'})
      Transaction.belongsTo(models.User, { foreignKey: 'sender_user_id', as: 'sender_user'})
      Transaction.belongsTo(models.User, { foreignKey: 'reciever_user_id', as: 'reciever_user'})
    }
  }
  Transaction.init({
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get(){ 
        return this.getDataValue('date')
          .toLocaleString('de-DE', { timeZone: 'UTC' });
      }
    },
    payment_amount: {
      type: DataTypes.DECIMAL,
      get(...args) {
        const value = this.getDataValue(args[0]);
        return value === null ? null : parseFloat(value);
      }
    },
    sender_envelope_id: DataTypes.INTEGER,
    reciever_envelope_id: DataTypes.INTEGER,
    sender_user_id: DataTypes.INTEGER,
    reciever_user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};