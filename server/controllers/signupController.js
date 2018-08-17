const { release } = require('os');
const bcrypt = require('bcryptjs');
const db = require('../../db/index.js').pool;
const uuidv1 = require('uuid/v1');

module.exports = {
  // we are taking the signUp form contents and hashing the provided password,
  // then we check the database to see if the user name is already taken
  // if it is not then we place the new user into the db and place the same data in the state
  signupController: (req, res) => {
    
    let form = req.body.formContents;
    // encrypt password
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(
        form.password
        , salt
        , (err, hash) => {
          if (err) { 
            console.error(err); 
          } else {
            // check if username exists
            db.connect((err, client) => {
              if (err) {
                console.error(err); 
              } else {
                let text = 'SELECT * FROM users WHERE email = $1';
                let value = [form.email];

                client.query(text, value)
                  .then(response => {
                    // the email submitted is not taken
                    if (response.rows.length === 0) {

                      // generate a uuid for the user
                      let uuid = uuidv1();

                      const query = 'INSERT INTO users(first_name, last_name, username, email, pwd, token) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
                      const values = [form.firstname, form.lastname, form.username, form.email, hash, uuid];
                      // enter user into db
                      client.query(query, values)
                        .then(response => {
                          console.log('SIGNUP:', response.rows[0]);
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

                          res.status(201).send(reducedObject);   
                        })
                        .catch(error => { res.status(500).send(error); });
                    } else {
                      // username is taken
                      let redir = { redirect: "/login" };
                      res.status(201).json(redir);
                      res.status(201).send('This user is already taken.');
                    }
                  })
                  .catch(error => { 
                    console.error(err);
                  });
              }
            });
            release();
          }
        }
      );
    });
  }
};
