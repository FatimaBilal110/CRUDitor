# User CRUD API + JWT TOKEN

A basic API built with Node.js and Express to manage users. MongoDB is used as the backend database. This application supports CRUD (Create, Read, Update, Delete) operations for user data.

---

## 📁 Project Structure

```
├── server.js                   
│
├── src/
│   ├── db/
│   │   └── mongo.js 
│   | 
│   ├── routes/
│   │   └── userRoutes.js    
│   │   └── authRoutes.js      
│   │
│   ├── controllers/
│   │   └── userController.js  
│   │   └── authController.js   
│   │
│   ├── middleware/
│   │   └──authMiddleware.js  
```
---

## 🚀 Features

- 🔐 **JWT Authentication**  
  - User receives a token on successful login.
  - Token is required to access protected routes (e.g., fetch user list).
  - Tokens expire after **1 hour** for security.
  - 📄 **User CRUD Operations**  
  - Create, Read, Update, and Delete users.
  - MongoDB for persistent storage.

---

## 🛠️ Tech Stack

- Node.js
- Express
- MongoDB (for database and data persistence)
- MongoDB Node.js Driver
- JWT (jsonwebtoken)
- bcrypt (for password hashing)
---

## 📡 API Endpoints

### 🔐 Auth Routes (Public)

Base URL: `http://localhost:5000/auth`

| Method | Endpoint    | Description        |
|--------|-------------|--------------------|
| POST   | `/register` | Register a user    |
| POST   | `/login`    | Login and get JWT  |

**Note:** On successful login, a JWT token is returned which must be used in headers for protected routes.

### 🔐 user Routes (Private)

Base URL: `http://localhost:5000/user`

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | `/list`        | Get list of all users   |
| GET    | `/:id`         | Get a user by ID        |
| POST   | `/create`      | Create a new user       |
| PUT    | `/update/:id`  | Update an existing user |
| DELETE | `/delete/:id`  | Delete a user by ID     |

## 🔒 Token Expiry

- Tokens expire in **1 hour** after issuance.
- Once expired, the user must **log in again** to receive a new token.
- All protected routes will return a `401 Unauthorized` error if the token is missing, invalid, or expired.

---

## 📦 Setup & Run

```bash
# Install dependencies
npm install

# Start the server
nodemon server.js