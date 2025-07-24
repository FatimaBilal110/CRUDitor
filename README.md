# User CRUD API

A basic API built with Node.js and Express to manage users. MongoDB is used as the backend database. This application supports CRUD (Create, Read, Update, Delete) operations for user data.

---

## 📁 Project Structure

```
├── server.js                   
│
├── src/
│   ├── db/
│   │   └── mongo.js  
│   ├── routes/
│   │   └── userRoutes.js       
│   │
│   ├── controllers/
│   │   └── userController.js   
│   │
```
---

## 🚀 Features

- List all users
- Get user by ID
- Create a new user
- Update user by ID
- Delete user by ID
- Data is persisted using MongoDB

---

## 🛠️ Tech Stack

- Node.js
- Express
- MongoDB (for database and data persistence)
- MongoDB Node.js Driver

---

## 📡 API Endpoints

Base URL: `http://localhost:3000/user`

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | `/list`        | Get list of all users   |
| GET    | `/:id`         | Get a user by ID        |
| POST   | `/create`      | Create a new user       |
| PUT    | `/update/:id`  | Update an existing user |
| DELETE | `/delete/:id`  | Delete a user by ID     |
