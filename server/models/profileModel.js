const db = require('../../db/index').pool;

module.exports = {
  fetchUserDetails: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = 'SELECT * FROM users WHERE id_user=$1';
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows[0]);
          }
        });
      }
    });
  },
  fetchUserRating: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = 'SELECT AVG(rating), COUNT(rating) FROM feedback WHERE id_seller=$1';
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows[0]);
          }
        });
      }
    });
  },
  fetchUserAddresses: ({ userId }, callback) => {
    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        let sqlStatement = 'SELECT * FROM address WHERE id_user=$1';
        let params = [userId];
        client.query(sqlStatement, params, (err, res) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, res.rows);
          }
        });
      }
    });
  },
  updateUserDetails: (userId, params, callback) => {
    let keys = Object.keys(params);
    let values = Object.values(params);
    let sqlBuilder = (keys, values, userId) => {
      let sql = 'UPDATE users SET ';
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          sql += `${keys[i]}='${values[i]}' `;
        } else {
          sql += `${keys[i]}='${values[i]}', `;
        }
      }

      sql += `WHERE id_user=${userId} RETURNING *`;
      return sql;
    };
    let sqlStatement = sqlBuilder(keys, values, userId);

    db.connect((err, client, release) => {
      if (err) {
        console.error('there was an error getting a connection from the pool', err);
      } else {
        console.log('SQL', sqlStatement);
        client.query(sqlStatement, (err, response) => {
          release();
          if (err) {
            callback(err.stack, null);
          } else {
            callback(null, response.rows[0]);
          }
        });
      }
    });
  },
  updateAddressDetail: (userId, addressId, params, callback) => {
    let keys = Object.keys(params);
    let values = Object.values(params);
    let updateBuilder = (keys, values, addressId) => {
      let sql = 'UPDATE users SET ';
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          sql += `${keys[i]}='${values[i]}' `;
        } else {
          sql += `${keys[i]}='${values[i]}', `;
        }
      }

      sql += `WHERE id_address=${addressId} RETURNING *`;
      return sql;
    };
    let counter = 1;
    let insertBuilder = (keys) => {
      let sql = 'INSERT INTO address ('
      for (let i = 0; i < keys.length + 1; i++) {
        if (i === keys.length - 1) {
          sql += `$${counter++}) `;
        } else {
          sql += `$${counter++}, `;
        }
      } 
      sql += `VALUES (`;
      for (let j = 0; j < keys.length + 1; j++) {
        if (j === keys.lenth - 1) {
          sql += `$${counter++}) `;
        } else {
          sql += `$${counter++}, `;
        }
      }
      return sql;
    }
    
    
    let sqlStatement = addressId > 0 ? updateBuilder(keys, values, addressId) : insertBuilder(keys);
    
    let params = keys.concat(values.concat(userId));
    
    console.log('sql statement', sqlStatement);
    console.log('params', params);

    if (addressId > 0) {
      /// do insert with params
      db.connect((err, client, release) => {
        if (err) {
          console.log('there was an error getting a connection from the pool', err)
        } else {
          client.query(sqlStatement, params, (err, response) => {
            release();
            if (err) {
              callback(err, null);
            } else {
              callback(response);
            }
          });
        }
      })
    } else {
      //do update with just sql statement
      db.connect((err, client, release) => {
        if (err) {
          console.log('there was an error getting a connection from the pool', err)
        } else {
          client.query(sqlStatement, (err, response) => {
            release();
            if (err) {
              callback(err, null);
            } else {
              callback(response);
            }
          });
        }
      });
    }
  
  }
};