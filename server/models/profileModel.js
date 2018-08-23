const db = require('../../db/index').pool;

module.exports = {
  fetchUserDetails: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = 'SELECT * FROM users WHERE id_user=$1';
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows[0]);
          }
        });
      }
    });
  },
  fetchUserRating: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = 'SELECT AVG(rating), COUNT(rating) FROM feedback WHERE id_seller=$1';
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows[0]);
          }
        })
      }
    })

  }
};