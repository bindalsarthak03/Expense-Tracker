const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { readdirSync } = require('fs');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const session = require('express-session');
// const { OAuth2Client } = require('google-auth-library');
// const oauth2Client = new OAuth2Client()
const passport = require('passport');
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
//middlewares
app.use(express.json())
app.use(cors())

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'API documentation for Expense Tracker application',
        },
    },
    apis: ['./routes/*.js'], // Path to the API routes
};

// Initialize swagger-jsdoc
const specs = swaggerJsdoc(options);

// Serve Swagger UI

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
readdirSync('./routes').map((route) => { app.use('/api/v1', require('./routes/' + route)) })

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`)
    })
}

server()