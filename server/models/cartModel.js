const read = require('../../db/index.js').read;
const write = require('../../db/index.js').write;

module.exports = {
  aggregateData: (id, userId) => {
    
    return read.connect()
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

  removeItem: (id, userId) => {
    return write.connect()
      .then(client => {
        let query = 'DELETE FROM cart_line_item WHERE id_listing=$1 AND id_user = $2';
        return client.query(query, [id, userId])
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
    return write.connect()
      .then(client => {
        client.query('SELECT * FROM cart_line_item WHERE id_listing = $1 AND id_user = $2', [listingId, userId])
          .then((results) => {
            if (results.rows.length === 0) {

              let sqlQuery = 'INSERT INTO cart_line_item (id_listing, id_user, quantity) VALUES ($1, $2, $3)';
              let params = [listingId, userId, quantity];
              return client.query(sqlQuery, params)
                .then(() => {            
                  client.release();
                  
                })
                .catch(e => {client.release();});
            } else { 
              let query = 'UPDATE cart_line_item SET quantity = $1 WHERE id_listing=$2 AND id_user = $3';              
              return client.query(query, [Number(results.rows[0].quantity) + Number(quantity), listingId, userId])
                .then(res => {
                  
                  client.release();
                  return res.rows;
                })
                .catch(e => {client.release();});
            }
          });

      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  lookup: (id) => {
    return read.connect()
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

  updateQuantity: (id, quantity, userId) => {
    
    return write.connect()
      .then(client => {
        
        let query = 'UPDATE cart_line_item SET quantity = $1 WHERE id_listing=$2 AND id_user = $3';
        
        return client.query(query, [quantity, id, userId])
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
