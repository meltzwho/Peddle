const db = require('../models/ordersModel');

module.exports = {
  fetchOrders: (req, res) => {
    db.fetchOrders(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching this sellers listings', err);
      } else {
        
        let count = 0;
        let orders = {
          active: [],
          completed: []
        }
        response.forEach((order) => {
          let listingIds = {};
          order.listings = [];
          db.fetchOrderDetails(order.id_order, (detailsErr, listResponse) => {
            count++;
            if (detailsErr) {
              console.error('controller: there was an error fetching this orders listings', detailsErr)
            } else {
              listResponse.forEach((listing) => {
                // console.log('the listing in the server', listing)
                if (listingIds[listing.id_listing]) {
                  'nothing'; 
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
            
            if (count === response.length) {
              orders.completed.sort((a, b) => b.id_order - a.id_order);
              orders.active.sort((a, b) => b.id_order - a.id_order);
              res.send(orders);
            }
            
          });
        });
      }
    });
  },
  newOrder: (req, res) => {    
    db.newOrder(req.body)
      .then((resp) => {res.end()})
      .catch((err) => console.log(err));
  }
};