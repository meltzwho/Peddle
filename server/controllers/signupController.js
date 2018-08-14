const { release } = require('os');
const bcrypt = require('bcryptjs');
const db = require('../../db/index.js').pool;

module.exports = {
  // hash for tom
  //  $2a$10$GhtVjROlQxkZukDKc2ASl.M/zIc/f9OyMCCw5we/ZOzO9mteWK.Nq

  // we are taking the signUp form contents and hashing the provided password,
  // then we check the database to see if the user name is already taken
  // if it is not then we place the new user into the db and place the same data in the redux store
  signupController: (req, res) => {
    let form = req.body.formContents;
    // encrypt password
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(
        form.password
        , salt
        , (err, hash) => {
          if (err) { 
            res.status(500).send(err); 
          } else {
            // check if username exists
            db.connect((err, client) => {
              if (err) {
                res.status(500).send(err); 
              } else {
                client.query(`SELECT username FROM users WHERE username = '${form.username}'`)
                  .then(response => {
                    
                    if (response.rows.length === 0) {
                      console.log('hash', hash);
                      const query = 'INSERT INTO users(first_name, last_name, username, email, pwd) VALUES($1, $2, $3, $4, $5)';
                      const values = [form.firstname, form.lastname, form.username, form.email, form.email];
                      // username not taken so enter user into db
                      client.query(query, values)
                        .then(response => {
                          
                          // successful entry of user into db
                          let redir = { redirect: "/" };
                          res.status(201).json(redir);
                          //res.status(201).send(response.rows[0]);
                          
                          // now set user into store
                        })
                        .catch(error => { 
                          console.log('err in insert');
                          res.status(500).send(error);
                        });
                    } else {
                      // username taken
                      let redir = { redirect: "/login" };
                      res.status(201).json(redir);
                      res.status(201).send('This user is already taken.');
                      release();
                    }
                  })
                  .catch(error => { 
                    res.status(500).send(error); 
                    release();
                  });
              }
            });
          }
        }
      );
    });
  }
};
