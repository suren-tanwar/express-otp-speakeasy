# OTP Authentication and Claim-Based Authorization App Documentation

## Overview

This Node.js application provides a simple OTP-based two-factor authentication and claim-based authorization system. 
It allows users to register, generate an OTP URI for authenticator apps, obtain a JWT token, and access protected endpoints 
that require valid JWT tokens and specific user claims.

## Getting Started

1. **Clone the Repository:**
   git clone https://github.com/your-username/express-otp-speakeasy.git
   cd express-otp-speakeasy

2. **Install Dependencies:**
   npm install

3. **Run the Server:**
   node app.js
   The server will be running on `http://localhost:3000`.

## Endpoints

### 1. Register a User and Obtain OTP URI and Token

**Endpoint:**
- `POST /register-user`
**Request Body:**
{
  "username": "john_doe",
  "issuer": "YourApp",
  "claims": ["admin"]
}

**Response Example:**
{
  "secret": "generated_secret_key",
  "otpUri": "otpauth://totp/YourApp:john_doe?secret=generated_secret_key&issuer=YourApp",
  "qrcode": "base64_encoded_qrcode_image",
  "token": "generated_jwt_token",
  "claims": ["admin"]
}
```

### 2. Generate OTP URI

**Endpoint:**
- `POST /generate-otp-uri`

**Request Body:**
{
  "username": "john_doe",
  "issuer": "YourApp"
}

**Response Example:**
{
  "secret": "generated_secret_key",
  "otpUri": "otpauth://totp/YourApp:john_doe?secret=generated_secret_key&issuer=YourApp",
}

### 3. Access a Protected Resource

**Endpoint:**
- `GET /protected-resource`

**Request Header:**
{
  "Authorization": "Bearer YOUR_GENERATED_JWT_TOKEN"
}
**Response Example:**
{
  "message": "This is a protected resource for admins."
}

### 4. Perform a Protected Action

**Endpoint:**
- `POST /protected-action`

**Request Header:**
{
  "Authorization": "Bearer YOUR_GENERATED_JWT_TOKEN"
}

**Response Example:**
{
  "message": "This is a protected action for users with write permissions."
}

### 5. Verify OTP

**Endpoint:**
- `POST /verify-otp`

**Request Body:**
{
  "username": "john_doe",
  "otp": "123456",
  "secret": "generated_secret_key"
}

**Response Example:**
{
  "success": true
}

## Security Considerations

1. **Secret Key:**
   - Replace the placeholder secret key in `jwt.sign` and `jwt.verify` with a strong, secure secret key.
   - Manage and store secret keys securely in a production environment.

2. **HTTPS:**
   - Consider using HTTPS to encrypt data transmitted between clients and the server for enhanced security.

## Testing the API

1. **Register a User:**
   curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "issuer": "YourApp", "claims": ["admin"]}' http://localhost:3000/register-user

2. **Generate OTP URI:**
   curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "issuer": "YourApp"}' http://localhost:3000/generate-otp-uri

3. **Access Protected Resource:**
   curl -H "Authorization: Bearer YOUR_GENERATED_JWT_TOKEN" http://localhost:3000/protected-resource

4. **Perform Protected Action:**
   curl -X POST -H "Authorization: Bearer YOUR_GENERATED_JWT_TOKEN" http://localhost:3000/protected-action

5. **Verify OTP:**
   curl -X POST -H "Content-Type: application/json" -d '{"username": "john_doe", "otp": "123456", "secret": "generated_secret_key"}' http://localhost:3000/verify-otp

Replace placeholder values such as `YOUR_GENERATED_JWT_TOKEN` and `generated_secret_key` with the actual values obtained during the registration process.

## Conclusion

This OTP authentication and claim-based authorization app provides a foundation for building secure APIs with role-based access control. Customize and extend it based on your application's specific requirements and security needs.
