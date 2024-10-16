const express = require('express');
const mongodb = require('./data/database');
const app = express();
const createError = require('http-errors'); // Remove duplicate declaration

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    createUserValidation,
    updateUserValidation,
    getSingleUserValidation,
    deleteUserValidation,
    validate,
} = require('./middlewares/validation');

// Swagger setup for API documentation
const swaggerUIPath = require('swagger-ui-express');
const swaggerjsonFilePath = require('./swagger-output.json');
app.use('/api-docs', swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

// Routes setup
app.use('/', require('./routes')); // Assuming all routes are bundled in './routes'

app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

app.get('/', (req, res) => {
    res.send('Node.js file upload REST APIs');
});

// Handle non-existent routes and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not Found')); // Using createError for 404 errors
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    // Handle any error and return a proper response
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message,
    });
});

// Set port
const port = process.env.PORT || 5500;

// Initialize MongoDB connection and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening on port ${port}`);
        });
    }
});
