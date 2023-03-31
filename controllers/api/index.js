const router = require('express').Router();

// Importing user and recipe routes
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');

// Registering user and recipe routes on the router
router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

// Exporting the router
module.exports = router;
