
const db = require('../models/loginModel.js');
const bcrypt = require('bcryptjs');

module.exports = {

  loginController: (req, res) => {
    let email = req.body.formContents.email;
    
    db.loginByEmail(email, (err, response) => {
      
      if (err) {
        console.error('controller: there was an error finding the username', err);
      } else {
        if (response.length > 0) {
          let dbemail = response[0].email;

          // check the password the user gave in login
          bcrypt.compare(req.body.formContents.password, response[0].pwd, (err, result) => {
            if (err) {
              console.error('Passwords do not match', err);
            } else {
              if (result === true && dbemail === email) {
                res.status(201).send(response[0]);
              } else {
                console.error('User is not valid');
              }
            }
          });
        }
      }
    });
  }
};