const db = require('../models/sellerDashboardModel');
const progress = require('../models/progressBarModel');

module.exports = {
  listings: (req, res) => {
    db.fetchListings(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        //need to refactor query  - interim solution
        //we only want 1 entry for each item, even if
        //it has multiple pictures 
        //below is workaround with breadcrumbing on object
        //and counting async func call completions 
        let listingIds = {};
        let counter = 0;

        let listings = {
          active: [],
          completed: []
        };

        if (response.length === 0) {
          res.send(listings);
        }
        
        response.forEach((row) => {
          progress.fetchStatus(row.id_listing, (statusErr, status) => {
            if (statusErr) {
              console.error('conroller: there was an error fetching the listing status', statusErr);
            } else if (listingIds[row.id_listing]) {
              counter++;
            } else {
              row.status = status;
              if (row.is_active > 0) {
                listingIds[row.id_listing] = true;
                listings.active.push(row);
              } else {
                listingIds[row.id_listing] = true;
                listings.completed.push(row);
              }
              counter++;
            }
            if (counter === response.length) {
              res.send(listings);
            }
          });
        });
      }
    });
  },
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
        })
        res.send(listings);
      }
    });
  }
};