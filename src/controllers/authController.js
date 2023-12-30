// controllers/authController.js
const authService = require('../services/authService');

const authenticateUser = (req, res) => {
  const { username, password } = req.body;
  console.log(`Received credentials - Username: ${username}, Password: ${password}`);

  const user = authService.authenticateUser(username, password);

  if (user) {
    res.json({ message: 'Authentication successful', userId: user.id });
  } else {
    console.log(`Authentication failed for Username: ${username}, Password: ${password}`);
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = {
  authenticateUser,
};

