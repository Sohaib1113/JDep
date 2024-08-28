'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      // define association here
    }
  }
  Job.init({
    companyName: DataTypes.STRING,
    position: DataTypes.STRING,
    contract: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,  // Use TEXT if it's a larger text field
  }, {
    sequelize,
    modelName: 'Job',
    timestamps: true, // This ensures Sequelize uses createdAt and updatedAt
  });
  return Job;
};
