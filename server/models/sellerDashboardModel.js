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
                            ORDER BY listing.id_listing DESC`;
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
        let sqlStatement = 'UPDATE order_line_item SET (is_shipped, tracking_number, shipping_carrier) = (1, $1, $2) WHERE id_listing=$3';
        let params = [details.trackingNo, details.carrier, details.listingId];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack);
          } else {
            callback(null, qry);
          }
        });
      }
    });
  },
  fetchSoldListings: (userId, callback) => {
    console.log('the user id', userId)
    read.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting the connection from the pool', err);
      } else {
        let sqlStatement = `SELECT order_line_item.*, listing.*, listing_image.image_url, orders.is_paid, address.*
                            FROM order_line_item
                            LEFT OUTER JOIN listing_image
                            ON order_line_item.id_listing=listing_image.id_listing
                            LEFT OUTER JOIN listing
                            ON order_line_item.id_listing=listing.id_listing
                            LEFT OUTER JOIN orders
                            ON order_line_item.id_order=orders.id_order
                            LEFT OUTER JOIN address
                            ON orders.id_address=address.id_address
                            WHERE listing.id_seller=$1
                            ORDER BY order_line_item.id_line_item DESC`;
        let params = [userId];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry.rows);
          }
        })
      }
    });
  },
  fetchActiveListings: (userId, callback) => {
    read.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err)
      } else {
        let sqlStatement = `SELECT listing.*, listing_image.image_url, address.*, category.category 
        FROM listing 
        LEFT OUTER JOIN listing_image 
        ON listing.id_listing=listing_image.id_listing
        LEFT OUTER JOIN address
        ON listing.id_address=address.id_address
        LEFT OUTER JOIN category 
        ON listing.id_category=category.id_category
        WHERE id_seller=$1 AND listing.is_active=1
        ORDER BY listing.id_listing DESC`;
        let params = [userId];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry.rows);
          }
        });
      }
    });
  }
};