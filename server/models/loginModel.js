const read = require('../../db/index.js').read;

module.exports = {

  loginByEmail: (email, callback) => {
    
    read.connect((err, client) => {
      if (err) {
        callback(err);
      } else {
        const query = 'SELECT * FROM users WHERE email=$1';
        
        client.query(query, [email], (err, res) => {
          client.release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows);
          }
        });
      }
    });
  }
};