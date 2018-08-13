
const bcrypt = require('bcryptjs');

module.exports = {
  signupController: (req, res) => {
  console.log('in routes/signup:', req.body.formContents.password);

  // encrypt password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(
      req.body.formContents.password
      , salt
      , (err, hash) => {
          console.log('hash:', hash);
      });
  });
  
  // put form into db
}
}