const db = require('../../db/index.js').pool;

module.exports = {
  aggregateData: (id) => {
    
    return db.connect()
      .then(client => {
        let query = 'SELECT * FROM listing INNER JOIN users ON listing.id_seller=users.id_user INNER JOIN listing_image ON listing.id_listing=listing_image.id_listing WHERE listing.id_listing=$1';
        
        let value  = [id];
        return client.query(query, value)
          .then(res => {
            
            client.release();
            return res.rows;
          })
          .catch(e => {client.release();});
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  removeItem: (id) => {
    return db.connect()
      .then(client => {
        let query = 'DELETE FROM cart_line_item WHERE id_listing=$1';
        return client.query(query, [id])
          .then(res => {
              
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error adding listing to cart: ', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  addToCart: (listingId, userId, quantity) => {
    return db.connect()
      .then(client => {
        let sqlQuery = 'INSERT INTO listing_image (id_listing, id_user, quantity) VALUES ($1, $2, $3)';
        let params = [listingId, userId, quantity];
        return client.query(sqlQuery, params)
          .then(res => {
            client.release();
            
          })
          .catch(e => {client.release();});
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  lookup: (id) => {
    return db.connect()
      .then(client => {
        
        return client.query('SELECT * FROM cart_line_item WHERE id_user=$1', [id])
          .then(res => {
            
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error adding listing to cart: ', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  updateQuantity: (id, quantity) => {
    return db.connect()
      .then(client => {
        
        let query = 'UPDATE cart_line_item SET quantity = $1 WHERE id_listing=$2';
        
        return client.query(query, [quantity, id])
          .then(res => {
            
            client.release();
            return res.rows;
          })
          .catch(e => {client.release();});
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
  
};
