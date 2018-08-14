const { release } = require('os');
const db = require('../../db/index.js').pool;

module.exports = {
  loginController: (req, res) => {
    let form = req.body.formContents;
    console.log('form:', form);

    // retrieve the username & email from db
    db.connect((err, client) => {
      if (err) {
        console.log('err', err);
        res.status(500).send(err); 
      } else {
        client.query(`SELECT username, email FROM users WHERE username = '${form.username}'`)
          .then(response => {
            
            if (response.rows.length === 1) {
              let email = response.rows[0].email;
              let username = response.rows[0].username;

              if (email === form.email && username === form.username) {
                console.log('validated:');
                // validation good, redirect home
                res.status(201).redirect('/');
              } else {
                console.log('notvalidated:');
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
            res.status(500).send(error); 
            release();
          });
      }
    });
  }
};