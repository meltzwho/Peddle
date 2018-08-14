const { Pool } = require('pg');
const config = require('../config.js').dbConfig;

const pool = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
});


// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

let dbConfirmationMessage = () => {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('there was an error getting the pool connection');
    } else {
      client.query('SELECT $1::text as message', ['DB Connection up and running!'], (err, res) => {
        release();
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0].message);
        }
      });
    }
  });

};

exports.pool = pool;
exports.dbConfirmationMessage = dbConfirmationMessage;