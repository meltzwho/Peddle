const db = require('../models/sellEntryModel.js');

module.exports = {
  categories: (req, res) => {
    db.fetchCategories((err, response) => {
      if (err) {
        console.error('controller: there was an error fetching the categories', err);
      } else {
        res.send(response);
      }
    });
  }
}