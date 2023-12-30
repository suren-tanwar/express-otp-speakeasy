// routes/otpRoutes.js
const express = require('express');
const otpController = require('../controllers/otpController');

const router = express.Router();

router.get('/generate-otp/:userId', otpController.generateOTPData);

module.exports = router;
