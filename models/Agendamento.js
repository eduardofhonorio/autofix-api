const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  veiculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  servico: {
    type: DataTypes.STRING, // ex: Troca de Oleo
    allowNull: false
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Agendamento.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Agendamento, { foreignKey: 'usuarioId' });

module.exports = Agendamento;