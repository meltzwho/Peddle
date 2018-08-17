const { release } = require('os');
const db = require('../../db/index.js').pool;

module.exports = {
  loginController: (req, res) => {
    let form = req.body.formContents;

    // retrieve the username & email from db
    db.connect((err, client) => {
      if (err) {
        console.error('err', err);
      } else {
        let text = 'SELECT * FROM users WHERE username = $1';
        let value = [form.username];
        client.query(text, value)
          .then(response => {
            
            if (response.rows.length !== undefined) {
              let email = response.rows[0].email;
              let username = response.rows[0].username;

              if (email === form.email && username === form.username) {
                // validation good
                res.status(201).send(response.rows[0]);
              } else {
                // validation bad, send message
                res.status(201).send('Not matched. Try again or signup.');
              }
              
            } else {
              // username not in db
              res.status(201).send('This user is not in our system.');
              release();
            }
          })
          .catch(error => { 
            console.error(err);
            release();
          });
      }
    });
  }
};