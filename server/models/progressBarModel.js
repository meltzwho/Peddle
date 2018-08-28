const db = require('../../db/index.js').pool;

module.exports = {
  fetchStatus: (listingId, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = `SELECT orders.is_paid, line.is_shipped, line.is_completed
                            FROM orders
                            LEFT OUTER JOIN order_line_item as line
                            ON line.id_order=orders.id_order
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