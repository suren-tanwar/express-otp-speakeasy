// utils/otpUtils.js
const speakeasy = require('speakeasy');

const generateSecret = () => speakeasy.generateSecret();

const generateOTPURI = (secret, label, issuer) => speakeasy.otpauthURL({ secret, label, issuer });

module.exports = {
  generateSecret,
  generateOTPURI,
};


