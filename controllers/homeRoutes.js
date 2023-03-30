const router = require('express').Router();
const { User, FavoriteRecipe, Recipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      limit: 5,
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const recipes = recipeData.map((recipeBook) => recipeBook.get({ plain: true }));

    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', (req, res) => {
  res.render('recipeform')
}
)

router.get('/project/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const project = recipeData.get({ plain: true });
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });
    console.log(userData);

    const recipes = userData.get({ plain: true });
    res.render('profile', {
      ...recipes,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all favorite recipes for a user
router.get('/profile/favorites', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const user = await User.findByPk(req.session.user_id, {
      include: [{ model: FavoriteRecipe, include: Recipe }],
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const favorites = user.FavoriteRecipes.map(favorite => favorite.Recipe.toJSON());
    res.render('favorites', { favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('signup');
});
module.exports = router;
