const db = require('../../db/index.js').pool;


module.exports = {
  getItems: (query) => {
    console.log(query);
    return db.connect()
      .then(client => {
        return client.query(
          `SELECT listing.*, category.category, array_agg(image_url) AS images
          FROM listing INNER JOIN category ON listing.id_category = category.id_category 
          FULL JOIN listing_image ON listing.id_listing = listing_image.id_listing 
          WHERE is_active = 1 AND quantity > 0 AND (UPPER(title) LIKE UPPER('%${query}%') OR UPPER(description) LIKE UPPER('%${query}%') OR UPPER(category) LIKE UPPER('%${query}%'))
          GROUP BY listing.id_listing, category.category`)
          .then(res => {
            client.release();
            
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection: ', e);
      });
  },
  getListingById: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM listing WHERE id_listing=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing by id: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
  get20: () => {
    return db.connect()
      .then(client => {
        return client.query('SELECT * FROM listing LIMIT 20') 
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.error('[model] error getting 20 items', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
};