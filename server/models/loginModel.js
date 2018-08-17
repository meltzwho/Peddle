const db = require('../../db/index.js').pool;

module.exports = {

  loginByUsername: (username, callback) => {
    
    db.connect((err, client, release) => {
      if (err) {
        console.error('Error in connection...', err);
      } else {
        const query = 'SELECT * FROM users WHERE username=$1';
        const name = [username];
        
        client.query(query, name, (err, res) => {
          release();
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