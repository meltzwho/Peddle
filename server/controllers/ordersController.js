const db = require('../models/ordersModel');

module.exports = {
  fetchOrders: (req, res) => {
    let counter = 0;
    let listingIds = {};
    let orders = {
      active: [],
      completed: []
    };
    db.fetchOrders(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        if (response.length === 0) {
          res.send(orders);
        } else {
          response.forEach((order, index) => {
            order.listings = [];
            db.fetchOrderDetails(order.id_order, (detailsErr, listResponse) => {

              if (detailsErr) {
                console.error('controller: there was an error fetching this orders listings', detailsErr)
              } else {
                listResponse.forEach((listing) => {
                  if (listingIds[listing.id_listing]) {
                    
                  } else {
                    listingIds[listing.id_listing] = true;
                    order.listings.push(listing);
                  }
                })
                if (order.is_completed > 0) {
                  orders.completed.push(order);
                } else {
                  orders.active.push(order);
                }

              }
              counter++;
              if (counter === response.length) {
                res.send(orders);
              }
            });
          });
        }
      }
    });
  }
};