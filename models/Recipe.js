// Import necessary models
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('ingredients'));
      },
      set(value) {
        this.setDataValue('ingredients', JSON.stringify(value));
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

// Export both models for use elsewhere in the application
module.exports = Recipe;
