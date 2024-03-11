module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todolist', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
  })
  todo.associate = (models) => {
    todo.belongsTo(models.user, {
      foreignKey: 'userId'
    });
  }
  return todo;
};