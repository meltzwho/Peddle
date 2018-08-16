
const validateCookie = require('../helpers/validateCookie');

module.exports = {
  validateController: (req, res) => {
    validateCookie(
      req.body.payload.token
      , req.body.payload.token_timestamp
      , (err, bool) => {
        if (err) { 
          res.status(201).send(err); 
        } else { res.status(201).send(bool); }
      }
    );
  }
};
  



