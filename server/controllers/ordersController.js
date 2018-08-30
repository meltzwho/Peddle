const db = require('../models/ordersModel');

module.exports = {
  fetchOrders: (req, res) => {
    db.fetchOrders(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        if (response.orders === null) {
          res.send(response);
        } else {
          let listingIds = {};
          let orders = {
            active: [],
            completed: []
          }
          response.forEach((order, index) => {
            order.listings = [];
            db.fetchOrderDetails(order.id_order, (detailsErr, listResponse) => {
              
              if (detailsErr) {
                console.error('controller: there was an error fetching this orders listings', detailsErr)
              } else {
                listResponse.forEach((listing) => {
                  // console.log('the listing in the server', listing)
                  if (listingIds[listing.id_listing]) {
                    return;
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
                if (index === response.length - 1) {
                  orders.completed.sort((a, b) => b.id_order - a.id_order);
                  orders.active.sort((a, b) => b.id_order - a.id_order);
                  console.log(orders);
                  
                  res.send(orders);
                }

              }
              
              
              
            });
          });
        }
      }
    });
  },
  newOrder: (req, res) => {    
    db.newOrder(req.body)
      .then((resp) => {res.end()})
      .catch((err) => console.log(err));
  }
};