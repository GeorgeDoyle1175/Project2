const router = require('express').Router();
const { Op } = require('sequelize');
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Search for recipes based on ingredients
router.get('/search', async (req, res) => {
  try {
    const { ingredient } = req.query;
    console.log(ingredient, req.query);

    const recipes = await Recipe.findAll({
      where: {
        ingredients: {
          [Op.substring]: [ingredient],
        },
      },
    });

    // const searchResults = recipes.get({ plain: true });
    // console.log(searchResults);
    console.log(recipes);
    res.render('recipe', { recipes });
   //res.send({ recipes });

    //res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all recipes associated with the given user ID
router.get('/user/:userId', async (req, res) => {
  console.log("hello");
  try {
    const recipes = await Recipe.findAll({
      where: {
        user_id: req.params.userId
      }
    });

    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Delete a self created recipe
// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const recipeData = await Recipe.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!recipeData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(recipeData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
