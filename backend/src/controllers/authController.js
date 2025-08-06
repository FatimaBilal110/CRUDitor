const connectDB = require('../db/mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '112@428-b'; 

exports.register = async (req, res) => {
  const db = await connectDB();
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('users').insertOne({
    Name: name,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'User registered successfully' });
};


exports.login = async (req, res) => {
  const db = await connectDB();
  const { email, password } = req.body;

  const user = await db.collection('users').findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });
 
 const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};
