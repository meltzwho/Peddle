const passport = require('passport');
const validateCookie = require('../helpers/validateCookie');
const removeCookie = require('../helpers/removeCookie');

module.exports = {
  
  validateController: (req, res) => {
    if (validateCookie()) {
      return true;
    } else {
      removeCookie();
    }

  };
  


};
