const db = require('../../db/index.js').pool;

module.exports = {
  fetchStatus: ({ listingId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = `SELECT orders.is_paid, orders.is_shipped, orders.is_completed
                            FROM orders
                            LEFT OUTER JOIN order_line_item
                            ON order_line_item.id_order=orders.id_order
                            WHERE id_listing=$1`;
        let params = [listingId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows[0]);
          }
        });
      }
    });
  }
};