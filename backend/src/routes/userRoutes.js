const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  listOfUsers,
  userById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/list', authMiddleware, listOfUsers);
router.get('/:id', authMiddleware, userById);
router.post('/create', authMiddleware,  upload.single('image'), createUser);
router.put('/update/:id', authMiddleware,  upload.single('image'), updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;
