'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    static associate(models) {
      // Define associations here
      Application.belongsTo(models.User, { foreignKey: 'userId' });
      Application.belongsTo(models.Job, { foreignKey: 'jobId' });
    }
  }
  Application.init({
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Jobs', // Reference to the Jobs table
        key: 'id',
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Reference to the Users table
        key: 'id',
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending', // Default status
    },
    appliedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
