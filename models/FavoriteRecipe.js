// Import necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User.js');
const Recipe = require('./Recipe.js');

// Define FavoriteRecipe model
class FavoriteRecipe extends Model {}

// Initialize FavoriteRecipe model with fields and constraints
FavoriteRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    recipe_id: {
      type: DataTypes.STRING,
      references: {
        model: Recipe,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorite_recipe',
  }
);

// Export FavoriteRecipe model for use elsewhere in the application
module.exports = FavoriteRecipe;
