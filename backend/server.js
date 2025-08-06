const express = require('express');
const cors = require('cors'); 
const path = require('path'); 

const app = express();

const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
const uploadRoutes = require('./src/routes/uploadRoutes');
app.use('/api', uploadRoutes); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server is running');
});
