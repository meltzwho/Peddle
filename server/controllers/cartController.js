const db = require('../models/cartModel.js');
console.log('CONTROLLER')
module.exports = {

  getListing_Photo_SellerName_By_Id: (req, res) => {
    console.log('CONTROLLER-photo')
    db.getListing_Photo_SellerName_By_Id(req.query.ID, req.query.currentUserID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error fetching item by id:', e);
        res.json(data);
      });
  },

  add_item_to_cart_table: (req, res) => {
    console.log('CONTROLLER-add item')
    db.add_item_to_cart_table(req.query.ID, req.query.currentUserID)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error adding item to cart table:', e);
        res.json(data);
      });
  },

  remove_from_cart: (req, res) => {
    console.log('try delete:', req.body);
    db.remove_from_cart(req.body.ID, req.body.quantity)
      .then(data => {
        res.json(data);
      })
      .catch(e => {
        console.error('[controller] error deleting item to cart table:', e);
        res.json(data);
      });
  },

  lookup_item_Cart: (req, res) => {
    console.log('FINALLY controller lookup;', req.query.ID)
    db.lookup_item_Cart(req.query.ID)
      .then(data => {
        console.log('lookup-ctrl:', data);
        res.send(data);
      })
      .catch(e => {
        console.error('[controller] error looking up item to cart table:', e);
        res.json(data);
      });
  }

};