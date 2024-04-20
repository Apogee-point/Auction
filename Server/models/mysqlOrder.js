const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('auction', 'root', 'Ssai@12345', {
  host: 'localhost',
  dialect: 'mysql'
});
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Transactions', // name of your model for transactions
      key: 'id',
    }
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: DataTypes.ENUM('processing', 'shipped', 'delivered'),
    defaultValue: 'processing'
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Order === sequelize.models.Order); // true