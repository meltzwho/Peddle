const db = require('../../db/index.js').pool;

module.exports = {
  fetchListings: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = `SELECT listing.*, listing_image.image_url, address.*, category.category 
                            FROM listing 
                            LEFT OUTER JOIN listing_image 
                            ON listing.id_listing=listing_image.id_listing
                            LEFT OUTER JOIN address
                            ON listing.id_address=address.id_address
                            LEFT OUTER JOIN category 
                            ON listing.id_category=category.id_category
                            WHERE id_seller=$1`;
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
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