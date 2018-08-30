const db = require('../models/sellerDashboardModel');
const progress = require('../models/progressBarModel');

module.exports = {
  tracking: (req, res) => {
    db.updateTrackingData(req.body, (err, response) => {
      if (err) {
        console.error('controller: there was an error updating the tracking info in the database', err);
      } else {
        res.sendStatus(201);
      }
    });
  },
  fetchSoldListings: (req, res) => {
    db.fetchSoldListings(req.query.userId, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the sold listings', err);
      } else {
        let listings = [];
        let lineItemId = {};
        response.forEach((listing) => {
          if (lineItemId[listing.id_line_item]) {

          } else {
            listings.push(listing);
            lineItemId[listing.id_line_item] = true;
          }
        });

        res.send(listings);
      }
    });
  },
  fetchActiveListings: (req, res) => {
    db.fetchActiveListings(req.query.userId, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the sold listings', err);
      } else {
        let listings = [];
        let listingId = {};
        response.forEach((listing) => {
          if (listingId[listing.id_listing]) {

          } else {
            listings.push(listing);
            listingId[listing.id_listing] = true;
          }
        });
        res.send(listings);
      }
    });
  },
  fetchInactiveListings: (req, res) => {
    db.fetchInactiveListing(req.query.userId, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the sold listings', err);
      } else {
        let listings = [];
        let listingId = {};
        response.forEach((listing) => {
          if (listingId[listing.id_listing]) {

          } else {
            listings.push(listing);
            listingId[listing.id_listing] = true;
          }
        });
        res.send(listings);
      }
    });
  }
};