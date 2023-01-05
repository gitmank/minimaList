// the usual imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');

// controllers
const schemaSetter = require('./controllers/schemaSetter');
const authenticator = require('./controllers/authenticator');
const sessionManager = require('./controllers/sessionManager');
const teamManager = require('./controllers/teamManager');

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

// getting schema and models
let User = schemaSetter.setUserSchema();
let Task = schemaSetter.setTaskSchema();
let Team = schemaSetter.setTeamSchema();
// let Hour    = schemaSetter.setHourSchema();
// let APIkey  = schemaSetter.setAPIkeySchema();
let Session = schemaSetter.setSessionSchema();

// default route used for ping test
app.get('/', (req, res) => {
    res.status(200).end('pong');
});

// PRIVATE routes accessible to frontend only

// signup route
app.post('/signup', (req, res) => authenticator.signup(req, res, bcrypt, User));

// store session route
app.post('/getSessionID', (req, res) => sessionManager.setSession(req, res, Session));

// create team route
app.post('/createTeam', (req, res) => teamManager.createTeam(req, res, Team));

// join team route
app.post('/joinTeam', (req, res) => teamManager.joinTeam(req, res, Team, User));

// route to check if user exists
app.post('/userExists', (req, res) => authenticator.checkUserExists(req, res, User));

// route to check if team code exists
app.post('/checkTeamCodeExists', (req, res) => authenticator.checkTeamCodeExists(req, res, Team));