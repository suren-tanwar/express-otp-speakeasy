// services/otpService.js
const otpUtils = require('../utils/otpUtils');

const generateOTPData = (userId) => {
  const secret = otpUtils.generateSecret();
  const otpURI = otpUtils.generateOTPURI(secret.ascii, `User-${userId}`, 'YourApp');

  return { secret, otpURI };
};

module.exports = {
  generateOTPData,
};
