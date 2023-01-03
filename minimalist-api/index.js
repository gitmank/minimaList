// the usual imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { response } = require('express');
const schemaSetup = require('./controllers/schemaSetup');

// express server
let app = express();
app.listen(process.env.PORT);

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongoDB Atlas connection
mongoose.connect(process.env.ATLAS_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('MongoDB Atlas connected'))
    .catch((error) => { console.log('MongoDB Atlas failed to connect') })

// creating user schema and models
let User = schemaSetup.setUserSchema();
let Task = schemaSetup.setTaskSchema();
let Team = schemaSetup.setTeamSchema();

// default route used for ping test
app.get("/", (req, res) => {
    res.status(200).end('pong');
});