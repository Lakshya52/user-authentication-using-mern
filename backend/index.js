const express = require('express')
const app = express()
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const ensureAuthenticated = require('./Middlewares/Auth');


const corsOptions = {
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  app.use(cors(corsOptions));


const PORT = process.env.PORT
const { signup, login } = require('./Controllers/AuthController');


app.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your dashboard!',
        user: req.user, // Decoded user info (e.g., _id, email)
        success: true,
    });
});

app.post('/login', login);
app.post('/signup', signup);
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your dashboard!',
        user: req.user, // Decoded user info (e.g., _id, email)
        success: true,
    });
});



const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })


app.listen(PORT || 5000, ()=>{
    console.log(`Server is successfully running on localhost:${PORT}`);
    
})