// dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GoKapture', 'root', 'kanan111"', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  retry: {
    match: [/ECONNREFUSED/],
    max: 10 // Maximum number of connection attempts
},
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},
});

module.exports = sequelize;
