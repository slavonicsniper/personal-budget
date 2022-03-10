'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Envelope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Envelope.hasMany(models.Transaction, { foreignKey: 'sender_envelope_id', as: 'sended_transactions'})
      Envelope.hasMany(models.Transaction, { foreignKey: 'reciever_envelope_id', as: 'recieved_transactions'})
      Envelope.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
    }
  }
  Envelope.init({
    name: DataTypes.STRING,
    budget: {
      type: DataTypes.DECIMAL,
      get(...args) {
        const value = this.getDataValue(args[0]);
        return value === null ? null : parseFloat(value);
      }
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Envelope',
  });
  return Envelope;
};