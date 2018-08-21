const db = require('../../db/index.js').pool;

module.exports = {
  getListing_Photo_SellerName_By_Id: (id) => {
    
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

  add_item_to_cart_table: (id, currentUserID) => {
   
    return db.connect()
      .then(client => {
        
        let query = 'INSERT INTO cart_line_item (id_listing, id_user, quantity) VALUES($1, $2, $3)';
        
        return client.query(query, [id, currentUserID, 1])
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

  remove_from_cart: (id, quantity) => {
   
    return db.connect()
      .then(client => {
        
        let query = 'DELETE FROM cart_line_item WHERE id_listing=$1 AND quantity=$2';
        
        return client.query(query, [id, quantity])
          .then(res => {
            client.release();
            
          })
          .catch(e => {client.release();});
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },

  lookup_item_Cart: (id) => {
   
    return db.connect()
      .then(client => {
        console.log('in MODEL LOOKUP:', id);
        let query = 'SELECT * FROM cart_line_item WHERE id_listing=$1';
        
        return client.query(query, [id])
          .then(res => {
            console.log('inMODELLOOKUP:', res.rows);
            client.release();
            return res.rows;
          })
          .catch(e => {console.log('lookuperror');client.release();});
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
  
};
