services/authService.js
const userService = require('./userService');

const authenticateUser = (username, password) => userService.getUserByUsernameAndPassword(username, password);

module.exports = {
  authenticateUser,
};



