const sequelize = require('../config/connection');
const { Recipe } = require('../models');
const { fetchRecipes } = require('../services/tasty-api');

async function seed() {
  await sequelize.sync({ force: true });

  const recipes = await fetchRecipes();

  for (const recipe of recipes) {
    await Recipe.create({
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.thumbnail_url,
      instructions: JSON.stringify(recipe.instructions),
      ingredients: JSON.stringify(recipe.sections[0].components)
    });
  }

  console.log('Database seeded successfully');
}

seed();
