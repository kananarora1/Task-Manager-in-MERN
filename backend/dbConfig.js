// dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GoKapture', 'root', 'kanan111"', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
