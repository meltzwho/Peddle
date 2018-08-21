
const db = require('../models/loginModel.js');

module.exports = {

  loginController: (req, res) => {
    
    db.loginByUsername(req.body.formContents.username, (err, response) => {
      console.log('the login by username response', response);
      if (err) {
        console.error('controller: there was an error finding the username', err);
      } else {
        if (response) {
          let email = response[0].email;
          let username = response[0].username;
          
          if ((email === req.body.formContents.email) && (username === req.body.formContents.username)) {
            res.status(201).send(response[0]);
          } else { 
            console.error('Username or email did not match, ...', err);
          }
          
        }
      }
    });
  }
};