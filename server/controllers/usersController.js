const db = require('../models/usersModel');

module.exports = {
  getUserById: (req, res) => {
    db.getUserById(req.params.id)
      .then(data => {
        console.log('[controller] user fetched');
        res.status(200).json(data);
      })
      .catch(e => {
        console.error('[controller] there was an error fetching the items: ', e);
        res.status(400).json(e);
      });
  },
  userToSeller: (req, res) => {
    db.userToSeller(req.body)
      .then(()=> res.end());
  }
};