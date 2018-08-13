const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const {session} = require('../config.js');
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profile.js');
const signupRoutes = require('./routes/signupRoutes.js');

require('./config/bearerAuthSetup.js');
require('./config/googleAuthSetup.js');
require('./config/facebookAuthSetup.js');

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  keys: [session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/signup', signupRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});