
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {google} = require('../../config.js');
const write = require('../../db/index.js').write;
const { setDefaultRating } = require('../models/signupModel');

// initiate our application to google
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: google.id,
      clientSecret: google.secret
    }
    , (accessToken, refreshToken, profile, done) => {
      
      write.connect((err, client) => {
        if (err) {
          return done(err);
        } else {
          // look for empty emails
          if (profile.emails[0].value !== '') { 
            
            client.query('SELECT * FROM users WHERE email = $1', [profile.emails[0].value])
              .then(res => {
                client.release();
                if (res.rows[0] === undefined) {
                  // strip the first part of email (up to '@') to use as the username
                  let splitUsername = profile.emails[0].value.split('@');

                  // the email and username is not taken, so enter the user into db
                  let text = 'INSERT INTO users(first_name, last_name, username, email, google_id, profile_image_url, token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                  let value = 
                    [
                      profile.name.givenName,
                      profile.name.familyName,
                      splitUsername[0],
                      profile.emails[0].value,
                      profile.id,
                      profile.photos[0].value,
                      accessToken
                    ];

                  client.query(text, value)
                    .then(res => {
                      // set default ratings for a new user
                      setDefaultRating(res.rows[0].id_user, (err, data) => {
                        if (err) console.error(err);
                        else console.log('after rating entry:', data);
                      })
                      
                      client.release();
                    })
                    .catch(err => {
                      console.error(err);
                      client.release();
                    });
          
                }
              })
              .catch(err => {
                console.error(err);
                client.release();
              });
          }
        }
      });
      return done(null, profile);
      
    }
  )
);


// the session is generated and placed here
passport.serializeUser( (user, done) => {
  done(null, user.id); 
});

passport.deserializeUser( (user, done) => {
  done(null, user);
});