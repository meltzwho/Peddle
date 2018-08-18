const db = require('../../db/index.js').pool;


module.exports = {
  getImagesByListingId: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM listing_image WHERE id_listing=${id}`)
          .then(res => {
            client.release();
            console.log('[model] fetched images by listing id')
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching images by listing id: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
};