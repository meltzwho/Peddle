const write = require('../../db/index.js').write;


module.exports = {
  associateImage: ({imageUrl, listingId}, callback) => {
    write.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool');
      } else {
        let sqlStatement = 'INSERT INTO listing_image (id_listing, image_url) VALUES ($1, $2)';
        let params = [listingId, imageUrl];
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