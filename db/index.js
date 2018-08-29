const { Pool } = require('pg');
const config = require('../config.js');

const write = new Pool({
  user: config.writeDb.user,
  host: config.writeDb.host,
  database: config.writeDb.database,
  password: config.writeDb.password,
  port: config.writeDb.port
});

const read = new Pool({
  user: config.readDb.user,
  host: config.readDb.host,
  database: config.readDb.database,
  password: config.readDb.password,
  port: config.readDb.port
});


// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
write.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

read.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

let writeConfirmationMessage = () => {
  write.connect((err, client, release) => {
    if (err) {
      console.error('there was an error getting the pool connection');
    } else {
      client.query('SELECT $1::text as message', ['DB write connection up and running!'], (err, res) => {
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

let readConfirmationMessage = () => {
  read.connect((err, client, release) => {
    if (err) {
      console.error('there was an error getting the pool connection');
    } else {
      client.query('SELECT $1::text as message', ['DB read connection up and running!'], (err, res) => {
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

exports.write = write;
exports.writeConfirmationMessage = writeConfirmationMessage;
exports.read = read;
exports.readConfirmationMessage = readConfirmationMessage;