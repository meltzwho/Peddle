const db = require('../../db/index.js').pool;

module.exports = {
  getListingAndPhoto: (id) => {
    console.log('listingModel: ', id);
    return db.connect()
      .then(client => {
        let query = 'SELECT * FROM listing INNER JOIN listing_image ON listing.id_listing=listing_image.id_listing WHERE listing.id_listing=$1';
        let value  = [id];
        return client.query(query, value)
          .then(res => {
            //console.log(res.rows);
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing by id: ', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
  addToCart: (listingId, userId, quantity) => {
    return db.connect()
      .then(client => {
        let sqlQuery = 'INSERT INTO cart_line_item (id_listing, id_user, quantity) VALUES ($1, $2, $3)';
        let params = [listingId, userId, quantity];
        return client.query(sqlQuery, params)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error adding listing to cart: ', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
};