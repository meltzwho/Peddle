
const uuidv1 = require('uuid');
const { hashPassword } = require('../helpers/hashPaswords');
const db = require('../../db/index.js').pool;


module.exports = {
  signupByEmail: (data, callback) => {
    
    db.connect((err, client, release) => {
      if (err) {
        console.error(err); 
      } else {
        let text = 'SELECT * FROM users WHERE email = $1';
        let email = [data.email];

        client.query(text, email)
          .then(response => {
            client.release();
           
            // the email submitted is not taken
            if (response.rows.length === 0) {
              
              // generate a uuid for the user
              let uuid = uuidv1(); 
              
              // hash the users password
              hashPassword(data.password, (err, result) => {
                if (err) {
                  console.error('Hash Failed...');
                } else {
                  let hashed = result;
                  
                  const query = 'INSERT INTO users(first_name, last_name, username, email, pwd, token) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
                  const values = [data.firstname, data.lastname, data.username, data.email, hashed, uuid];

                  db.connect((err, client, release) => {
                    if (err) {
                      console.error('Error in connection...', err);
                    } else {
                      client.query(query, values)
                        .then(response => {
                          client.release();
                          
                          if (response.rows) {
                            // copy the response in order to delete sensitive information
                            let reducedObject = {};
                            reducedObject.id_user = response.rows[0].id_user;
                            reducedObject.first_name = response.rows[0].first_name;
                            reducedObject.last_name = response.rows[0].last_name;
                            reducedObject.username = response.rows[0].username;
                            reducedObject.email = response.rows[0].email;
                            reducedObject.google_id = response.rows[0].google_id;
                            reducedObject.facebook_id = response.rows[0].facebook_id;
                            reducedObject.token = response.rows[0].token;
                            reducedObject.token_timestamp = response.rows[0].token_timestamp;
                            reducedObject.profile_image = response.rows[0].profile_image;

                            callback(null, reducedObject); 
                          } 
                        })
                        .catch(error => { 
                          client.release();
                          callback(error);
                        });
                    }
                  });
                } 
              });
            } 
          });
      }
    });
  }
};