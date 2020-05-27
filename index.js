const express = require('express');
const app = express();
const mongoose = require('mongoose');
var session = require('express-session');
const fileupload = require('express-fileupload');


// to convert form data to json;
app.use(fileupload({ useTempFiles: true, tempFileDir: './uploads' }));

//to create a session whenever a connection is established
app.use(session({
    secret: '1a2b#$$#',
    resave: true,
    saveUninitialized: true,
    })
);

//importing api methods
const login = require('./src/api/user/login');
const register = require('./src/api/user/register');
const registerConfirmation = require('./src/api/user/registerConfirmation');
const reset = require('./src/api/user/reset');
const resetConfirmation = require('./src/api/user/resetConfirmation');
const uploadFile = require('./src/api/media/upload');
const showAll = require('./src/api/media/showAll');
const playFile = require('./src/api/media/play');

//mongoDB connection cofigs
const mongoConfig = require('./mongo.config.js');
//to get 'users' collection object for read and write function in collection
mongoose
    .connect(mongoConfig.mongo_uri, mongoConfig.connection_options)
    .then(()=>console.log("connected to databse."));



//Routes
//home page route
app.post('/', (req, res) => {
    res.send('You are on home page.');
});

//user register route
app.post('/api/user/register', async (req, res) => {
    register(req, res);
});
//register confirmation route
app.post('/api/user/register-confirmation', async (req, res) => {
    registerConfirmation(req, res);
})
//user login route
app.post('/api/user/login', async (req, res) => {
    login(req, res);
});
//password reset route
app.post('/api/user/reset', async (req, res) => {
    reset(req, res);
});
//password reset confirmation route
app.post('/api/user/reset-confirmation', async (req, res) => {
    resetConfirmation(req, res);
});
//upload media route
app.post('/api/media/upload', (req, res) => {
    uploadFile(req, res);
});
//user media route
app.get('/api/media/', (req, res) => {
    showAll(req, res);
});
//media play route
app.get('/api/media/play', (req,res)=>{
    playFile(req,res);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    mongoose.connection;
    console.log(`app is now running on port : ${port}`);
});