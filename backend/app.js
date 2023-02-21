// === IMPORT PACKAGES ===
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');



// === ENVIRONMENT === (isProduction true/false)
const { environment } = require('./config');
const isProduction = environment === 'production';

// === INITIALIZE EXPRESS APPLICATION ===
const app = express();

// === MIDDLEWARE ===

// logging information about requests and responses
app.use(morgan('dev'));

// cookie parsing
app.use(cookieParser());
// parses JSON bodies of requests with "Content-Type" of "application/json"
app.use(express.json());

// Security Middleware

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

const routes = require('./routes');

app.use(routes); // Connect all the routes

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("Resource Not Found");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
});

const { ValidationError } = require('sequelize');

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {

    console.error(err);

    if (err.message === 'Invalid credentials' ||
        err.message === 'Authentication required') {
        delete err.errors
    }

    if (err.message === 'User with that email already exists' ||
        err.message === 'User with that username already exists') {
        err.message = 'User already exists';
        err.status = 403;
    }

    res.status(err.status || 500);

    res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        statusCode: err.status,
        errors: err.errors
        // stack: isProduction ? null : err.stack
    });
});

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = app;
