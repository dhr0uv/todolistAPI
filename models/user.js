const todo = require('../models/todo');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/
      },
    },
  }, {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  })
  return user;
}
