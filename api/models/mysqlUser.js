
const User = sequelize.define('User', {
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
  
module.exports = User;