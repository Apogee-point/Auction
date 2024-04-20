const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('auction', 'root', 'Ssai@12345', {
  host: 'localhost',
  dialect: 'mysql'
});

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // references: {
    //   model: 'Users', 
    //   key: 'id',
    // }
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    /* The `references` property in the `item_id` field of the `Transaction` model is used to establish
    a foreign key relationship between the `Transaction` model and the `Items` model. */
    // references: {
    //   model: 'Items', 
    //   key: 'id',
    // }
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending'
  }
}, {
  // Other model options go here
});

// `sequelize.define` also returns the model
console.log(Transaction === sequelize.models.Transaction); // true