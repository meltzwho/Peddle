const db = require('../../db/index.js').pool;


module.exports = {
  fetchCategories: (callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        client.query('SELECT * FROM category', (err, res) => {
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
  addListing: (listing, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let shipping = listing.allowShipping ? 1 : 0;
        let local = listing.allowPickup ? 1 : 0;
        let sqlStatement = 'INSERT INTO listing (id_category, title, condition, price, id_seller, id_address, is_active, quantity, description, is_shipping, is_local) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
        let params = [listing.selectedCategoryId, listing.productName, listing.productCondition, listing.productPrice, 1, 1, 1, listing.productQuantity, listing.productDescription, shipping, local];
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