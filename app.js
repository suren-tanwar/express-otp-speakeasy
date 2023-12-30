const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------------------------------------Task 1------------------------------
// Generate a secret key for each user
function generateSecret() {
  return speakeasy.generateSecret({ length: 20 }).base32;
}

// Generate an OTP URI for the user
function generateOTPUri(secret, username, issuer) {
  return speakeasy.otpauthURL({
    secret,
    label: `${issuer}:${username}`,
    issuer,
  });
}

// Endpoint to get the OTP URI for a user
app.post('/generate-otp-uri', (req, res) => {
  const { username, issuer } = req.body;
  if (!username || !issuer) {
    return res.status(400).json({ error: 'Username and issuer are required.' });
  }
  const secret = generateSecret();
  const otpUri = generateOTPUri(secret, username, issuer);
   res.json({ secret, otpUri});
});

// Endpoint to verify the provided OTP
app.post('/verify-otp', (req, res) => {
  const { username, otp, secret } = req.body;
 if (!username || !otp || !secret) {
    return res.status(400).json({ error: 'Username, OTP, and secret are required.' });
  }
  const verified = speakeasy.totp({
    secret,
    encoding: 'base32',
    token: otp,
  });

  if (verified) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid OTP' });
  }
});
// Now test  endpoints by  Postman and interact with the server.
// This will return a JSON object containing the secret, OTP URI, and a QR code.
// To verify the OTP:
// {"username": "john_doe", "issuer": "YourApp"}' http://localhost:3000/generate-otp-uri
// {"username": "john_doe", "otp": "123456", "secret": "generated_secret"}' http://localhost:3000/verify-otp

// ------------------------------------Task------------ 2 & 3-------------------------- 

// In-memory store for user data (replace this with a database in production)
const users = {};
// To extend the authentication system to include claim-based authorization,  use JSON Web Tokens (JWTs) to encode claims and roles for users
// Middleware to verify JWT and extract claims
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// Generate a secret key and JWT for each user
function generateSecretAndToken(username, issuer, claims) {
  const secret = generateSecret();
  const otpUri = generateOTPUri(secret, username, issuer);
  users[username] = { secret, claims };
  const token = jwt.sign({ username, claims }, 'your-secret-key', { expiresIn: '1h' });
  return { secret, otpUri, token };
}

// Endpoint to register a user and generate OTP URI and token
app.post('/register-user', (req, res) => {
    const { username, issuer, claims } = req.body;
    if (!username || !issuer || !claims) {
      return res.status(400).json({ error: 'Username, issuer, and claims are required.' });
    }
    const { secret, otpUri, token } = generateSecretAndToken(username, issuer, claims);
      res.json({ secret, otpUri, token, claims });
  });
//   when a user registers, they can provide a list of claims (roles or permissions) in the request body. 
//   These claims will be stored in the users object along with the user's secret key.
//    The claims will also be included in the JWT token generated for the user.


  // Middleware to check user claims before allowing access
function checkClaims(allowedClaims) {
  return (req, res, next) => {
    const { claims } = req.user;
    if (!claims || !claims.some((claim) => allowedClaims.includes(claim))) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Protected endpoint that requires specific claims
app.get('/protected-resource', verifyToken, checkClaims(['admin']), (req, res) => {
  res.json({ message: 'This is a protected resource for admins.' });
});

// Another protected endpoint that requires different claims
app.post('/protected-action', verifyToken, checkClaims(['write']), (req, res) => {
    res.json({ message: 'This is a protected action for users with write permissions.' });
  });
// Port where project is run
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

