const express = require('express');
const router = express.Router();
const {
  listOfUsers,
  userById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/list', authMiddleware, listOfUsers);
router.get('/:id', authMiddleware, userById);
router.post('/create', authMiddleware, createUser);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;
