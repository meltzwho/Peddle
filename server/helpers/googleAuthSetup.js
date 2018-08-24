//import { access } from 'fs';
const { release } = require('os');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const {google} = require('../../config.js');
const db = require('../../db/index.js').pool;


// initiate our application to google
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: google.id,
      clientSecret: google.secret
    }
    , (accessToken, refreshToken, profile, done) => {
      
      db.connect((err, client, release) => {
        if (err) {
          console.error('db connection error', err);
        } else {
          // no empty emails
          //console.log('profile', profile)
          if (profile.emails[0].value !== '') { 
            
            let text = 'SELECT * FROM users WHERE email = $1';
            let value = [profile.emails[0].value];
            
            client.query(text, value)
              .then(res => {
                client.release();
                if (res.rows[0] === undefined ) {
                  // the email and username is not taken, so enter the user into db
                  let text = 'INSERT INTO users(first_name, last_name, username, email, google_id, profile_image_url, token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
                  let value = 
                    [
                      profile.name.givenName,
                      profile.name.familyName,
                      profile.displayName,
                      profile.emails[0].value,
                      profile.id,
                      profile.photos[0].value,
                      accessToken
                    ];

                  client.query(text, value)
                    .then(res => {client.release()})
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