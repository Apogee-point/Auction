const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://user:Ssai@12345@localhost:3306/mydatabase');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

(async () => {
  await sequelize.sync({ force: true }); // sync the model with the database
  const user = await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password' });
  console.log(user.toJSON());
})();