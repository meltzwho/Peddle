const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passportSetup = require('./helpers/passport-setup');
const writeConfirmation = require('../db/index').writeConfirmationMessage; // db connection confirmation message
const readConfirmation = require('../db/index').readConfirmationMessage; // db connection confirmation message
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const {session} = require('../config');
const fileUpload = require('express-fileupload');

//Routes
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const loginRoutes = require('./routes/loginRoutes');
const sellEntryRoutes = require('./routes/sellEntryRoutes');
const notifRoutes = require('./routes/notifications');
const onboardUserRoutes = require('./routes/onboardUserRoutes');
const validateRoutes = require('./routes/validateRoutes');  
const sessionRoutes = require('./routes/sessionRoutes');
const listingsRoutes = require('./routes/listingsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const imageUploadRoutes = require('./routes/imageUploadRoutes');
const imageRoutes = require('./routes/imageRoutes');
const ratingsRoutes = require('./routes/ratingsRoutes');
const sellerDashboardRoutes = require('./routes/sellerDashboardRoutes');
const progressBarRoutes = require('./routes/progressBarRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const profileRoutes = require('./routes/profileRoutes');
const stripeRoutes = require('./routes/stripeRoutes');


require('./helpers/googleAuthSetup');


const signupRoutes = require('./routes/signupRoutes');

const app = express();

//Middleware
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(fileUpload());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day
  httpOnly: false,
  keys: [session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);
app.use('/cart', cartRoutes);
app.use('/login', loginRoutes);
app.use('/sellEntry', sellEntryRoutes);
app.use('/notifs', notifRoutes);
app.use('/onboard', onboardUserRoutes);
app.use('/signup', signupRoutes);
app.use('/session', sessionRoutes);
app.use('/l', listingsRoutes);
app.use('/validate', validateRoutes);
app.use('/users', usersRoutes);
app.use('/images', imageRoutes);
app.use('/imageUpload', imageUploadRoutes);
app.use('/ratings', ratingsRoutes);
app.use('/sellerDashboard', sellerDashboardRoutes);
app.use('/progressBar', progressBarRoutes);
app.use('/orders', ordersRoutes);
app.use('/profile', profileRoutes);
app.use('/stripe', stripeRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});


let port = process.env.PORT || 3000;

writeConfirmation();
readConfirmation();

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

exports.app = app;