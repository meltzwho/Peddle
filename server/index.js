const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const passportSetup = require('./config/passport-setup.js');
const dbConfirmation = require('../db/index.js').dbConfirmationMessage; // db connection confirmation message
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const {session} = require('../config.js');
const authRoutes = require('./routes/authRoutes.js');
const profileRoutes = require('./routes/profile.js');
// require these 3 to invoke the code
const bearerAuthSetup = require('./config/bearerAuthSetup.js');
const googleAuthSetup = require('./config/googleAuthSetup.js');
const facebookAuthSetup = require('./config/facebookAuthSetup.js');

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

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


let port = process.env.PORT || 3000;

dbConfirmation();

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});