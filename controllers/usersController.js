const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new user (POST)
const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        const result = await mongodb.getDatabase().db().collection('users').insertOne(user);
        res.status(201).json({ userId: result.insertedId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users (GET)
const getAllUsers = async (req, res) => {
    try {
        const users = await mongodb.getDatabase().db().collection('users').find().toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID (GET)
const getSingleUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const user = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID (PUT)
const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const updates = req.body;

        const result = await mongodb.getDatabase().db().collection('users').updateOne(
            { _id: userId },
            { $set: updates }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'User not found' });
        
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID (DELETE)
const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

        if (result.deletedCount === 0) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
