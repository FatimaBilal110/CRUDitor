const {ObjectId} = require('mongodb');
const connectDB = require('../db/mongo');

exports.listOfUsers = async (req, res) => {
  const db = await connectDB();

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const users = await db.collection('users')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalUsers = await db.collection('users').countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({ users, totalUsers, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

exports.userById = async (req, res) => {
  const db = await connectDB();
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.createUser = async (req, res) => {
  const db = await connectDB();
  const { Name, email } = req.body;
  const result = await db.collection('users').insertOne({ Name, email });

  res.json({ _id: result.insertedId, Name, email });
};

exports.updateUser = async (req, res) => {
  const db = await connectDB();
  const { Name, email } = req.body;
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { Name, email } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Update Failed", error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  const db = await connectDB();
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const result = await db.collection('users').findOneAndDelete({
      _id: new ObjectId(userId),
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "deletion Failed", error: error.message });
  }
};
