
const Cookies = require('universal-cookie');
const db = require('../../db/index.js').pool;
let cookie = new Cookies();

// returns a boolean
let isCookieValid = () => {
  // lookup the cookie on browser
  let cookieValue = cookie.get('token');

  // lookup the cookie on db
  let dbValue = {};

  db.connect((err, client) => {
    if (err) {
      res.status(500).send(err); 
    } else {
      client.query(`SELECT token, token_timestamp FROM users WHERE token = '${cookieValue.token_timestamp}'`)
        .then(response => {
          if (response.rows.length !== 0) {
            dbValue.token = response.rows[0].token;
            dbValue.token_timestamp = response.rows[0].token_timestamp;
          }
        })
        .catch(err => console.error(err));
    }
  });

  console.log(dbValue.token === cookieValue.token 
    && dbValue.token_timestamp === cookieValue.token_timestamp)

  return (
    dbValue.token === cookieValue.token 
    && dbValue.token_timestamp === cookieValue.token_timestamp
  );
}
module.exports = isCookieValid;