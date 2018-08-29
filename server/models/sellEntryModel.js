const read = require('../../db/index.js').read;
const write = require('../../db/index.js').write;


module.exports = {
  fetchCategories: (callback) => {
    read.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        client.query('SELECT * FROM category', (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry.rows);
          }
        });
      }
    });
  },
  addListing: (listing, callback) => {
    write.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let shipping = listing.allowShipping ? 1 : 0;
        let local = listing.allowPickup ? 1 : 0;
        let sqlStatement = 'INSERT INTO listing (id_category, title, condition, price, id_seller, id_address, is_active, quantity, description, is_shipping, is_local) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id_listing';
        let params = [listing.selectedCategoryId, listing.productName, listing.productCondition, listing.productPrice, listing.userId, listing.addressId, 1, listing.productQuantity, listing.productDescription, shipping, local];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry);
          }
        });
      
      }

    });
  },
  addAddress: (listing, callback) => {
    write.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = 'INSERT INTO address (id_user, address, city, state, zip_code, is_default) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_address';
        let params = [listing.userId, listing.streetAddress, listing.cityAddress, listing.stateAddress, listing.zipCodeAddress, 1];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry);
          }
        })
      }
    })
  },
  editListing: (listing, callback) => {
    write.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let shipping = listing.allowShipping ? 1 : 0;
        let local = listing.allowPickup ? 1 : 0;
        let sqlStatement = 'UPDATE listing SET (id_category, title, condition, price, id_seller, id_address, is_active, quantity, description, is_shipping, is_local) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE id_listing=$12 RETURNING id_listing';
        let params = [listing.selectedCategoryId, listing.productName, listing.productCondition, listing.productPrice, listing.userId, listing.addressId, 1, listing.productQuantity, listing.productDescription, shipping, local, listing.listingId];
        client.query(sqlStatement, params, (err, qry) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, qry);
          }
        });
      }
    });
  }
};
