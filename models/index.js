const User = require('./User');
const Recipe = require('./Recipe');
const FavoriteRecipe = require('./FavoriteRecipe');

// Define many-to-many association between User and Recipe models
User.belongsToMany(Recipe, {
  through: 'FavoriteRecipe',
  foreignKey: 'user_id'
});
Recipe.belongsToMany(User, {
  through: 'FavoriteRecipe',
  foreignKey: 'recipe_id'
});

// Associate the new model with User and Recipe models
User.hasMany(FavoriteRecipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Recipe.hasMany(FavoriteRecipe, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
});

// Export the models
module.exports = { User, Recipe, FavoriteRecipe };
