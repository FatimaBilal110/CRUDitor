# User CRUD API

A basic API built with Node.js and Express to manage users. This application supports CRUD (Create, Read, Update, Delete) operations with user data stored in a local JSON file.

---

## 📁 Project Structure

```
├── server.js                   
│
├── user.json
├── src/
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
- Data stored in a local JSON file (no external database)

---

## 🛠️ Tech Stack

- Node.js
- Express
- File system module (`fs`) for data persistence

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
