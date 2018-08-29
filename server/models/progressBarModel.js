const read = require('../../db/index.js').read;

module.exports = {
  fetchStatus: (listingId, callback) => {
    read.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = `SELECT orders.is_paid, orders.id_address, line.is_shipped, line.is_completed, address.*
                            FROM orders
                            LEFT OUTER JOIN order_line_item as line
                            ON line.id_order=orders.id_order
                            LEFT OUTER JOIN address
                            ON orders.id_address=address.id_address
                            WHERE id_listing=$1`;
        let params = [listingId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            let resData;
            //the listing won't have a response to this query if it hasn't been bought
            if (res.rows.length < 1) {
              resData = {is_paid: 0, is_shipped: 0, is_completed: 0};
            } else {
              resData = res.rows[0];
            }
            callback(null, resData);
          }
        });
      }
    });
  }
};