const bcrypt = require('bcryptjs');

module.exports = {
 
  hashPassword: (password, callback) => {
    
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(
        password
        , salt
        , (err, hash) => {
          if (err) { 
            callback(err); 
          } else {
            callback(null, hash);
          }
        }
      );
    });
  }
};