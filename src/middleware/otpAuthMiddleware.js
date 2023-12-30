// // middleware/otpAuthMiddleware.js
const speakeasy = require('speakeasy');

const authenticateOTP = (req, res, next) => {
  const { userId, token } = req.body;
  // Generate a secret key for each user
  const secret = speakeasy.generateSecret({ length: 20 });
  console.log(`Received OTP token: ${token} for user ${userId}`);
  
// Generate an OTP URI for the user
  const isValid = speakeasy.totp({ token , 
     secret: secret.base32, 
     encoding: 'base32'
    });
    console.log('Secret: ', secret.base32); 
    console.log('token ', token); 

  if (isValid) {
    req.userId = userId;
    next();
  } else {
    console.log(`Invalid OTP for user ${userId}`);
    res.status(401).json({ message: 'Invalid OTP' });
  }
};

module.exports = {
  authenticateOTP,
};

