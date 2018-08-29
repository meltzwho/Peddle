const read = require('../../db/index.js').read;
const write = require('../../db/index.js').write;

module.exports = {
  fetchListings: ({ userId }, callback) => {
    read.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = `SELECT listing.*, listing_image.image_url, address.*, category.category 
                            FROM listing 
                            LEFT OUTER JOIN listing_image 
                            ON listing.id_listing=listing_image.id_listing
                            LEFT OUTER JOIN address
                            ON listing.id_address=address.id_address
                            LEFT OUTER JOIN category 
                            ON listing.id_category=category.id_category
                            WHERE id_seller=$1
                            ORDER BY listing.id_listing`;
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
  },
  updateTrackingData: (details, callback) => {
    write.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting the connection from the pool', err);
      } else {
        client.query('BEGIN');
        client.query(' UPDATE order_line_item SET is_shipped=1 WHERE id_listing =$1', [details.listingId], (err, qry) => {
          if (err) {
            callback(err);
          }
        });
        client.query('UPDATE listing SET tracking_number=$1, shipping_carrier=$2 WHERE id_listing=$3', [details.trackingNo, details.carrier, details.listingId], (err, qry) => {
          if (err) {
            callback(err);
          }
        });
        client.query('COMMIT', (err, qry) => {
          if (err) {
            callback(err);
          } else {
            release();
            callback(null, qry.rows);

          }
        });
      }
    });
  }
};