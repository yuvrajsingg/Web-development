# PART I: Backend Authentication Testing Guide

## Setup Prerequisites
1. Ensure MongoDB is running
2. Start your Express server on port 5000
3. Have Postman or Insomnia installed for API testing

---

## Step 1: Start the Server

Open terminal and run:
```bash
cd server
npm start
```

You should see:
```
✅ Connected to MongoDB
[REQ] GET /
```

---

## Step 2: Create Admin User (Hardcoded in MongoDB)

### Using Postman: Sign Up Admin User

**Method:** POST  
**URL:** `http://localhost:5000/auth/signup`  
**Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@portfolio.com",
  "password": "Admin@123",
  "passwordConfirm": "Admin@123",
  "role": "admin"
}
```

**Screenshot 1:** Capture successful admin signup response with token and user data

Expected Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

---

## Step 3: Create Regular User

### Using Postman: Sign Up Regular User

**Method:** POST  
**URL:** `http://localhost:5000/auth/signup`  
**Body (JSON):**
```json
{
  "name": "Regular User",
  "email": "user@portfolio.com",
  "password": "User@123",
  "passwordConfirm": "User@123",
  "role": "user"
}
```

Expected Response (201): User created successfully

---

## Step 4: Test Admin SignIn

### Using Postman: POST /auth/signin

**Method:** POST  
**URL:** `http://localhost:5000/auth/signin`  
**Body (JSON):**
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@123"
}
```

**Screenshot 2:** Capture successful signin with JWT token

Expected Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

---

## Step 5: Test User SignIn

### Using Postman: POST /auth/signin (as Regular User)

**Method:** POST  
**URL:** `http://localhost:5000/auth/signin`  
**Body (JSON):**
```json
{
  "email": "user@portfolio.com",
  "password": "User@123"
}
```

Expected Response (200): Returns token with user role: "user"

---

## Step 6: Test SignOut

### Using Postman: GET /auth/signout

**Method:** GET  
**URL:** `http://localhost:5000/auth/signout`  
**Headers:** (No auth needed for simple signout)

**Screenshot 3:** Capture successful signout response

Expected Response (200):
```json
{
  "message": "Successfully signed out"
}
```

---

## Step 7: Test Protected Route (With Valid Token)

### Using Postman: GET /auth/user (Authenticated)

**Method:** GET  
**URL:** `http://localhost:5000/auth/user`  
**Headers:**
```
Authorization: Bearer <your_jwt_token_here>
```

Or set Cookie:
```
Cookie: t=<your_jwt_token_here>
```

**Screenshot 4:** Capture successful protected route access showing user data

Expected Response (200):
```json
{
  "user": {
    "id": "...",
    "email": "admin@portfolio.com",
    "role": "admin"
  }
}
```

---

## Step 8: Test Protected Route (Without Token - Should Fail)

### Using Postman: GET /auth/user (No Auth)

**Method:** GET  
**URL:** `http://localhost:5000/auth/user`  
**Headers:** (Leave Authorization empty, no cookies)

**Screenshot 5:** Capture 401 error - no token provided

Expected Response (401):
```json
{
  "error": "No token provided"
}
```

---

## Step 9: Test Protected Route (With Invalid Token - Should Fail)

### Using Postman: GET /auth/user (Invalid Token)

**Method:** GET  
**URL:** `http://localhost:5000/auth/user`  
**Headers:**
```
Authorization: Bearer invalid_token_12345
```

**Screenshot 6:** Capture 401 error - invalid token

Expected Response (401):
```json
{
  "error": "Invalid token"
}
```

---

## Step 10: Test Invalid SignIn (Wrong Password)

### Using Postman: POST /auth/signin (Wrong Password)

**Method:** POST  
**URL:** `http://localhost:5000/auth/signin`  
**Body (JSON):**
```json
{
  "email": "admin@portfolio.com",
  "password": "WrongPassword123"
}
```

**Screenshot 7:** Capture 401 error - invalid credentials

Expected Response (401):
```json
{
  "error": "Invalid email or password"
}
```

---

## Step 11: Test Invalid SignIn (Email Not Found)

### Using Postman: POST /auth/signin (Non-existent Email)

**Method:** POST  
**URL:** `http://localhost:5000/auth/signin`  
**Body (JSON):**
```json
{
  "email": "nonexistent@portfolio.com",
  "password": "SomePassword123"
}
```

Expected Response (401):
```json
{
  "error": "Invalid email or password"
}
```

---

## Step 12: Verify MongoDB Database

### Screenshots from MongoDB

**Screenshot 8:** Open MongoDB Compass or terminal and show the `users` collection

Command in MongoDB terminal:
```bash
db.users.find().pretty()
```

Show:
- Admin user with role: "admin"
- Regular user with role: "user"
- Hashed passwords
- Created timestamps

---

## Summary of Screenshots Needed for PART I:

1. ✅ Admin Signup Response (with token)
2. ✅ Admin SignIn Response (with token)
3. ✅ SignOut Success Response
4. ✅ Protected Route Access (With Valid Token) - 200 OK
5. ✅ Protected Route Access (Without Token) - 401 Error
6. ✅ Protected Route Access (Invalid Token) - 401 Error
7. ✅ SignIn with Wrong Password - 401 Error
8. ✅ MongoDB Database - Users Collection (showing admin & user roles)

---

## API Endpoints Summary

| Method | URL | Auth Required | Role Required | Description |
|--------|-----|---------------|---------------|-------------|
| POST | /auth/signup | ❌ No | - | Create new user account |
| POST | /auth/signin | ❌ No | - | Login and get JWT token |
| GET | /auth/signout | ❌ No | - | Clear auth cookie |
| GET | /auth/user | ✅ Yes | - | Get current authenticated user |

---

## Testing Checklist

- [ ] Admin account created successfully
- [ ] Regular user account created successfully
- [ ] Admin can sign in with correct credentials
- [ ] User can sign in with correct credentials
- [ ] SignOut clears authentication
- [ ] Protected route accessible with valid token
- [ ] Protected route returns 401 without token
- [ ] Protected route returns 401 with invalid token
- [ ] Sign in fails with wrong password
- [ ] MongoDB shows users with correct roles

