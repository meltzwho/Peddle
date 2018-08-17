const db = require('../../db/index.js').pool;


module.exports = {
  checkNotifications: (userID, response) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting the pool connection');
      } else {
        client.query('SELECT * FROM NOTIFICATION WHERE id_user=$1 AND is_read=0', [userID], (err, res) => {
          release();
          if (err) {
            console.log(err.stack);
          } else {
            response.send(res.rows);
          }
        });
      }
    });
  },
  genNotifications: (id_user, notif_type, id_src) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting the pool connection');
      } else {
        client.query('INSERT INTO NOTIFICATION(id_user, notif_type, id_src, is_read) VALUES($1, $2, $3, 0)', [id_user, notif_type, id_src], (err, res) => {
          release();
          if (err) {
            console.log(err.stack);
          } else {
            console.log(res.rows);
          }
        });
      }
    });
  }
};