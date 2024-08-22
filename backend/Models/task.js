const { Model, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');

class Task extends Model {}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['Todo', 'In Progress', 'Done'],
      defaultValue: 'Todo'
    },
    priority: {
      type: DataTypes.ENUM,
      values: ['Low', 'Medium', 'High'],
      defaultValue: 'Medium'
    },
    dueDate: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Task'
  }
);

module.exports = Task;
