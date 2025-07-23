const express = require('express');
const router = express.Router();
const {
  listOfUsers,
  userById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.get('/list', listOfUsers);
router.get('/:id', userById);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;
