const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController'); 

// Create a new user (POST)
router.post('/', userController.createUser);

// Get all users (GET)
router.get('/', userController.getAllUsers);

// Get a single user by ID (GET)
router.get('/:id', userController.getSingleUser);

// Update a user by ID (PUT)
router.put('/:id', userController.updateUser);

// Delete a user by ID (DELETE)
router.delete('/:id', userController.deleteUser);

module.exports = router;
