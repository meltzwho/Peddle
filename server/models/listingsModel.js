const db = require('../../db/index.js').pool;


module.exports = {
  getItems: () => {
    return db.connect()
      .then(client => {
        return client.query('SELECT * FROM listing')
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection: ', e);
      });
  },
  getListingById: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM listing WHERE id_listing=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing by id: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
};