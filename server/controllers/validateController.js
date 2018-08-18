
const validateCookie = require('../helpers/validateCookie');

module.exports = {
  validateController: (req, res) => {
    if (req.body.payload) {
      //console.log('ValidateCTRL: ', req.body.payload);
      validateCookie(
        req.body.payload.token
        , req.body.payload.token_timestamp
        , (err, bool) => {
          if (err) {
            console.log('err:',bool); 
            res.status(201).send(err); 
          } else {res.status(201).send(bool); }
        }
      );
    }
  }
};
  



