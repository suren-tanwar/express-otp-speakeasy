// services/userService.js
const users = [
  { id: 1, username: 'user1', password: 'password1', claims: ['read'] },
  { id: 2, username: 'admin', password: 'admin123', claims: ['read', 'write'] },
  // Add more users as needed
];

const getUserByUsernameAndPassword = (username, password) => users.find((user) => user.username === username && user.password === password);
const getUserById = (userId) => users.find((user) => user.id === userId);

module.exports = {
  getUserByUsernameAndPassword,getUserById
};


