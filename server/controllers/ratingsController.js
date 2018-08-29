const db = require('../models/ratingsModel');

module.exports = {
  getRatingsByUserId: (req, res) => {
    db.getRatingsByUserId(req.params.userId)
      .then(data => {
        console.log('[controller] user rating fetched');
        res.status(200).json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching user rating: ', e);
        res.status(400).json(e);
      });
  },
  getFeedbackByUserId: (req, res) => {
    db.getFeedbackByUserId(req.params.userId)
      .then(data => {
        console.log('[controller] user feedback fetched');
        res.status(200).send(data);
      })
      .catch(e => {
        console.error('[controller] error fetching user feedback: ', e);
        res.status(400).json(e);
      });
  },
  updateRatingBySellerId: (req, res) => {
    let sellerId = req.body.sellerId;
    let rating = req.body.rating;
    db.getRatingsByUserId(sellerId)
      .then(ratings => {
        let ratingId = ratings[0].id_rating;
        let oldRating = ratings[0].rating;
        let oldCount = ratings[0].count;
        let newCount = oldCount + 1;
        let newRating = (oldCount * oldRating + rating) / newCount;
        db.updateRatingByRatingId(ratingId, newRating, newCount)
          .then(() => {
            console.log('[controller] user rating updated');
            res.sendStatus(200);
          })
          .catch(e => {
            console.error('[controller] error updating user rating: ', e);
            res.status(400).json(e);
          });
      })
      .catch(e => {
        console.error('[controller] error fetching user rating: ', e);
        res.status(400).json(e);
      });
  },
  addFeedback: (req, res) => {
    let sellerId = req.body.sellerId;
    let buyerId = req.body.buyerId;
    let listingId = req.body.listingId;
    let rating = +req.body.rating;
    let feedback = req.body.feedback;
    let title = req.body.title;
    db.addFeedback(sellerId, buyerId, rating, feedback, listingId, title)
      .then(() => {
        console.log('[controller] user feedback added')
        res.sendStatus(200);
      })
      .catch(e => {
        console.error('[controller] error adding feedback', e);
        res.status(400).send();
      });
  }
};