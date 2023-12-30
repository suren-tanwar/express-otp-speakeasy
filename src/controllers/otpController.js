// controllers/otpController.js
const otpService = require('../services/otpService');

const generateOTPData = (req, res) => {
  const userId = req.params.userId;
  const otpData = otpService.generateOTPData(userId);

  res.json({ otpData });
};

module.exports = {
  generateOTPData,
};
