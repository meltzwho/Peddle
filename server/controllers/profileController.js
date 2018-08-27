const db = require('../models/profileModel');

module.exports = {
  fetchUserDetails: (req, res) => {
    db.fetchUserDetails(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the user details', err);
      } else {
        res.send(response);
      }
    });
  },
  fetchUserRating: (req, res) => {
    db.fetchUserRating(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the user rating', err);
      } else {
        res.send(response);
      }
    });
  },
  fetchUserAddresses: (req, res) => {
    db.fetchUserAddresses(req.query, (err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the addresses associated witht the profile', err)
      } else {
        res.send(response);
      }
    });
  },
  updateUser: (req, res) => {
    let newObj = {};
    for (let key in req.body) {
      if (key === 'userId') {
      } else {
        newObj[key] = req.body[key];
      }
    }
    db.updateUserDetails(req.body.userId, newObj, (err, response) => {
      if (err) {
        console.error('there was an error updating this profile\'s user details', err);
      } else {
        res.send(response);
      }
    })
  },
  updateAddress: (req, res) => {
    let newObj = {};
    for (let key in req.body) {
      if (key === 'userId' || key === 'addressId') {
      } else {
        newObj[key] = req.body[key];
      }
    }
    db.updateAddressDetail(req.body.userId, req.body.addressId, newObj, (err, response) => {
      if (err) {
        console.error('there was an error inserting/updating this profile\'s address details', err);
      } else {
        res.send(response);
      }
    });
  }
};