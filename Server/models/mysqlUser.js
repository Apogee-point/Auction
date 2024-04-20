const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('auction', 'root', 'Ssai@12345', {
  host: 'localhost',
  dialect: 'mysql'
});
const mysqlUser = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mongodb_user_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  
module.exports = mysqlUser;