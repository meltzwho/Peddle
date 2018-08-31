
const bcrypt = require('bcryptjs');
const db = require('../models/loginModel.js');

module.exports = {
  loginController: (req, res) => {
    let email = req.body.formContents.email;
    
    db.loginByEmail(email, (err, response) => {
      if (err) {
        
        res.status(401).send(err);
      } else {
        if (response.length > 0) {
          // check if the user signed in with google auth 
          if (response[0].google_id !== null) {
            res.status(401).send('Please Log In With Google.');
          } else {            
            let dbemail = response[0].email;

            // check the password the user gave in login
            bcrypt.compare(req.body.formContents.password, response[0].pwd, (err, result) => {
              if (err) {
                res.status(500).send('Hashing password issue.');
              } else {
                if (result === true && dbemail === email) {
                  res.status(201).send(response[0]);
                } else {                  
                  res.status(401).send('Invalid credentials.');
                }
              }
            });
          }
        }
        else res.status(401).send('Invalid credentials.');
      }
    });
  }
};