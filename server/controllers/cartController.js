const db = require('../models/cartModel.js');

module.exports = {

  getListing_Photo_SellerName_By_Id: (req, res) => {
    
    db.getListing_Photo_SellerName_By_Id(req.query.ID, req.query.currentUserID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching item by id:', e);
        res.json(data);
      });
  },

  remove_from_cart: (req, res) => {
    
    db.remove_from_cart(req.body.ID, req.body.quantity)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error deleting item to cart table:', e);
        res.json(data);
      });
  },

  updateQuantity: (req, res) => {
    
    db.increment(req.body.ID)
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  },

  lookup: (req, res) => {
    
    db.decrement(req.body.ID)
      .then(data => {
        res.send(data);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  }

};