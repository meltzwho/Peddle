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
            db.fetchOrderDetails(order.id_order, (detailsErr, listResponse) => {
              console.log(listResponse)
              if (detailsErr) {
                console.error('controller: there was an error fetching this orders listings', detailsErr)
              } else if (listingIds[listResponse[0].id_listing]) {
                return;
              } else {
                order.listings = listResponse;
                if (order.is_completed > 0){
                  orders.completed.push(order);
                } else {
                  orders.active.push(order);
                }
              }
              if (index === response.length-1) {
                console.log('orders', orders)
                res.send(orders);
              }
            })
          })
        }
      }
    });
  }
};