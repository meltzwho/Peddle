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
  },
  newOrder: (orderInfo) => {
    return db.connect()
      .then(client => {
        return client.query('INSERT INTO address(id_user, address, city, state, zip_code) VALUES($1, $2, $3, $4, $5)', 
          [orderInfo.id_buyer, orderInfo.address.shipping_address_line1, orderInfo.address.shipping_address_city, orderInfo.address.shipping_address_state, orderInfo.address.shipping_address_zip])
          .then(res => {
            console.log(res);
            
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('error creating order', e);
          })
      })
      .catch(e => {
        console.error('there was an error getting the pool connection', e);
      });
  }
};