const db = require('../models/sellerDashboardModel');
const progress = require('../models/progressBarModel');

module.exports = {
  listings: (req, res) => {
    db.fetchListings(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        //need to refactor query, we only want 1 entry for each item, even if
        //it has multiple pictures below is workaround with breadcrumbing on object
        let listingIds = {};

        let listings = {
          active: [],
          completed: []
        };
        response.forEach((row, index) => {
          progress.fetchStatus(row.id_listing, (statusErr, status) => {
            if (statusErr) {
              console.error('conroller: there was an error fetching the listing status', statusErr);
            } else if (listingIds[row.id_listing]) {
              return;
            } else {
              row.status = status;
              if (row.is_active > 0) {
                listingIds[row.id_listing] = true;
                listings.active.push(row);
              } else {
                listingIds[row.id_listing] = true;
                listings.completed.push(row);
              }
            }
            if (index === response.length - 1) {
              res.send(listings);
            }
          });
        });
      }
    });
  }
};