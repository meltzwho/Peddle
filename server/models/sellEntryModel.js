const db = require('../../db/index.js').pool;


module.exports = {
  fetchCategories: (callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting the pool connection');
      } else {
        client.query('SELECT * FROM category', (err, res) => {
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
}