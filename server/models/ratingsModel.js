const db = require('../../db/index.js').pool;


module.exports = {
  getRatingsByUserId: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM rating WHERE id_user=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('error fetching listing', e);
          })
      })
      .catch(e => {
        console.error('there was an error getting the pool connection', e);
      });
  },
  getFeedbackByUserId: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM feedback WHERE id_seller=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('error fetching listing', e);
          })
      })
      .catch(e => {
        console.error('there was an error getting the pool connection', e);
      });
  },
};