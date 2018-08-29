const read = require('../../db/index.js').read;
const write = require('../../db/index.js').write;


module.exports = {
  getRatingsByUserId: (id) => {
    return read.connect()
      .then(client => {
        return client.query(`SELECT * FROM rating WHERE id_user=${id}`)
          .then(res => {
            client.release();
            console.log('[model] fetched rating by userId');
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching rating', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting the pool connection', e);
      });
  },
  getFeedbackByUserId: (id) => {
    return read.connect()
      .then(client => {
        return client.query(`SELECT * FROM feedback WHERE id_seller=${id}`)
          .then(res => {
            client.release();
            console.log('[model] fetched feedback by userId');
            
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching feedback', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
  updateRatingByRatingId: (id_rating, rating, count) => {
    return write.connect()
      .then(client => {
        return client.query(`UPDATE rating SET rating=${rating}, count=${count} WHERE id_rating=${id_rating};`)
          .then(res => {
            client.release();
            console.log('[model] updated rating by ratingId');
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error updating rating', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
  addFeedback: (sellerId, buyerId, rating, feedback, listingId, timestamp, title) => {
    return write.connect()
      .then(client => {
        let query = 'INSERT INTO feedback(id_seller, id_buyer, rating, feedback, id_listing, timestamp, title) VALUES($1, $2, $3, $4, $5, $6, $7);';
        let params = [sellerId, buyerId, rating, feedback, listingId, timestamp, title];
        return client.query(query, params)
          .then(res => {
            client.release();
            console.log('[model] added feedback');
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error adding feedback', e);
          });
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  },
};