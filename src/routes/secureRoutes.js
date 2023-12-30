// routes/secureRoutes.js
const express = require('express');
const secureController = require('../controllers/secureController');
const otpAuthMiddleware = require('../middleware/otpAuthMiddleware');
const claimAuthMiddleware = require('../middleware/claimAuthMiddleware');

const router = express.Router();

router.post('/secure-endpoint', otpAuthMiddleware.authenticateOTP, claimAuthMiddleware.authorizeClaims(['write']), secureController.secureResource);

module.exports = router;


