const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const passportSetup = require('./helpers/passport-setup.js');
const dbConfirmation = require('../db/index.js').dbConfirmationMessage; // db connection confirmation message
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const {session} = require('../config.js');
const loginRoutes = require('./routes/loginRoutes.js');
const sellEntryRoutes = require('./routes/sellEntryRoutes.js');
const notifRoutes = require('./routes/notifications.js');

require('./helpers/googleAuthSetup.js');
require('./helpers/facebookAuthSetup.js');


const db = require('./models/models.js');
const signupRoutes = require('./routes/signupRoutes.js');

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
//   keys: [session.cookieKey]
// }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/login', loginRoutes);
app.use('/sellEntry', sellEntryRoutes);
app.use('/notifs', notifRoutes);
app.use('/signup', signupRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


let port = process.env.PORT || 3000;

dbConfirmation();

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

exports.app = app;