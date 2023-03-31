const router = require('express').Router();

// Importing the User model
const { User } = require('../../models');

// User signup
router.post('/signup', async (req, res) => {
  try { 
    // Creating a new user with data from the request body
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password })

    // Saving user session data and sending a JSON response with user data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Finding a user by email and checking their password
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log({userData})
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Saving user session data and sending a JSON response with user data
    const validPassword = await userData.checkPassword(req.body.password);
    validPassword?console.log({validPassword}):""

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
