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
    var idOrder = null;
    return db.connect()
      .then(client => {
        return client.query('INSERT INTO address(id_user, address, city, state, zip_code) VALUES($1, $2, $3, $4, $5) RETURNING *', 
          [orderInfo.id_buyer, orderInfo.address.shipping_address_line1, orderInfo.address.shipping_address_city, orderInfo.address.shipping_address_state, orderInfo.address.shipping_address_zip])
          .then(res => {
            return client.query('INSERT INTO orders(id_buyer, is_paid, id_address, transfer_group) VALUES($1, $2, $3, $4) RETURNING *', 
              [orderInfo.id_buyer, 1, res.rows[0].id_address, orderInfo.transfer_group])
              .then(res1 => { idOrder = res1.rows[0].id_order; return res1.rows});
          })
          .then(() => {
            return client.query('SELECT cart_line_item.*, listing.quantity AS lQuan, listing.quantity_sold AS lQuanS FROM cart_line_item INNER JOIN listing ON cart_line_item.id_listing = listing.id_listing WHERE id_user = $1', 
              [orderInfo.id_buyer])
              .then(res1 => {return res1.rows});
          })
          .then((res) => {
            var promises = [];
            for (var cartLineItem of res) {
              if (cartLineItem.lQuanS === undefined) cartLineItem.lQuanS = 0;
              promises.push(client.query('INSERT INTO order_line_item(id_order, id_listing, quantity, is_shipped, is_completed) VALUES($1, $2, $3, $4, $5) RETURNING *',
                [idOrder, cartLineItem.id_listing, cartLineItem.quantity, 0, 0])
                .then(res1 => {return res1.rows}));
              if (cartLineItem.lQuan - (cartLineItem.quantity + cartLineItem.lQuanS) === 0) {
                promises.push(client.query('UPDATE listing SET is_active = 0, quantity_sold = $1 WHERE id_listing = $2',
                  [cartLineItem.lQuan, cartLineItem.id_listing])
                  .then(res1 => {return res1.rows}));
              } else {
                promises.push(client.query('UPDATE listing SET quantity_sold = $1 WHERE id_listing = $2',
                  [cartLineItem.lQuanS + cartLineItem.quantity, cartLineItem.id_listing])
                  .then(res1 => {return res1.rows}));
              }
            }
            return Promise.all(promises)
              .then(res2 => {return res2});
          })
          .then(res => {
            return client.query('DELETE FROM cart_line_item WHERE id_user = $1', [orderInfo.id_buyer])
              .then(()=>{ client.release(); return; }).catch(e=>console.log(e)
              );
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