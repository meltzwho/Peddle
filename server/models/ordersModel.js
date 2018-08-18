const db = require('../../db/index.js').pool;

module.exports = {
  fetchOrders: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = `SELECT * FROM orders WHERE id_buyer=$1`;
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            let resData;
            if (res.rowCount.length < 1) {
              resData = {orders: null}
            } else {
              resData = res.rows
            }
            callback(null, resData);
          }
        });
      }
    });
  },
  fetchOrderDetails: (orderId, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = `SELECT order_line_item.*, listing.*, listing_image.image_url 
                            FROM order_line_item
                            LEFT OUTER JOIN listing
                            ON order_line_item.id_listing=listing.id_listing
                            LEFT OUTER JOIN listing_image
                            ON listing.id_listing=listing_image.id_listing
                            WHERE id_order=$1
                            `;
        let params = [orderId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows);
          }
        })
      }
    })
  }
};