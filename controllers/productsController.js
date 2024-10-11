const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create a new product (POST)
const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        };
        const result = await mongodb.getDatabase().db().collection('products').insertOne(product);
        res.status(201).json({ productId: result.insertedId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all products (GET)
const getAllProducts = async (req, res) => {
    try {
        const products = await mongodb.getDatabase().db().collection('products').find().toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID (GET)
const getSingleProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const product = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId });

        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product by ID (PUT)
const updateProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const updates = req.body;

        const result = await mongodb.getDatabase().db().collection('products').updateOne(
            { _id: productId },
            { $set: updates }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a product by ID (DELETE)
const deleteProduct = async (req, res) => {
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });

        if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
