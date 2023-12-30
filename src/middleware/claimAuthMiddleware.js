// middleware/claimAuthMiddleware.js
const userService = require('../services/userService');

const authorizeClaims = (requiredClaims) => (req, res, next) => {
  const user = userService.getUserById(req.userId);
console.log(user)
  if (user && requiredClaims.every((claim) => user.claims.includes(claim))) {
   
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authorizeClaims,
};


