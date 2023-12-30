// routes/authRoutes.js
// const express = require('express');
// const authController = require('../controllers/authController');

// const router = express.Router();

// router.post('/authenticate', authController.authenticateUser);

// module.exports = router;

// const express = require('express');
// const authController = require('../controllers/authController');
// const { verifyToken, checkClaims } = require('../middleware/otpAuthMiddleware');

// const router = express.Router();

// router.post('/register-user', authController.registerUser);

// router.get('/protected-resource', verifyToken, checkClaims(['admin']), (req, res) => {
//   res.json({ message: 'This is a protected resource for admins.' });
// });

// router.post('/protected-action', verifyToken, checkClaims(['write']), (req, res) => {
//   res.json({ message: 'This is a protected action for users with write permissions.' });
// });

// module.exports = router;

// /src/routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const { verifyToken, checkClaims } = require('../middleware/otpAuthMiddleware');

const router = express.Router();
router.post('/register-user', authController.registerUser);
router.get('/protected-resource', verifyToken, checkClaims(['admin']), authController.protectedResource);
router.post('/protected-action', verifyToken, checkClaims(['write']), authController.protectedAction);
router.post('/generate-otp-uri', authController.generateOTPUri);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
