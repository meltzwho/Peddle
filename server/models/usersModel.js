const db = require('../../db/index.js').pool;


module.exports = {
  getUserById: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM users WHERE id_user=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('error fetching user', e);
          })
      })
      .catch(e => {
        console.error('there was an error getting the pool connection', e);
      });
  },
  userToSeller: (user) => {
    return db.connect()
      .then(client => {
        return client.query(`UPDATE users SET is_seller = 1, id_stripe = $1 WHERE id_user = ${user.userId} RETURNING *`, [user.stripe_user_id])
          .then(res => {
            client.release();
            console.log(res.rows[0]);
            return;
          })
          .catch(e => {
            client.release();
            console.log('error fetching user', e);
          });
      })
      .catch(e => {
        console.error('there was an error getting the pool connection', e);
      });
  }
};