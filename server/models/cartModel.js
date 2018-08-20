const db = require('../../db/index.js').pool;

module.exports = {
  getListingAndPhoto: (id) => {
    console.log('listingModel: ', id);
    return db.connect()
      .then(client => {
        let query = 'SELECT * FROM listing INNER JOIN users ON listing.id_seller=users.id_user INNER JOIN listing_image ON listing.id_listing=listing_image.id_listing WHERE listing.id_listing=$1';
        
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
};

// OLD TWO table query
// let query = 'SELECT * FROM listing INNER JOIN listing_image ON listing.id_listing=listing_image.id_listing WHERE listing.id_listing=$1';