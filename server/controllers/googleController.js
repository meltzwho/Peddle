const { release } = require('os');
const db = require('../../db/index.js').pool;


module.exports = {
  
  googleController: (req, response) => {
    
    let id = req.query.id;
    
    // lookup in db
    db.connect((err, client) => {
      if (err) {
        response.status(500).send(err);
      } else {
        let text = 'SELECT * FROM users WHERE google_id = $1';
        let value = [id];
            
        client.query(text, value)
          .then(res => {
            console.log('response rows ', res.rows)
            client.release();
            if (res.rows.length > 0) {
              let reducedObject = {};
              reducedObject.id_user = res.rows[0].id_user;
              reducedObject.first_name = res.rows[0].first_name;
              reducedObject.last_name = res.rows[0].last_name;
              reducedObject.username = res.rows[0].username;
              reducedObject.email = res.rows[0].email;
              reducedObject.google_id = res.rows[0].google_id;
              reducedObject.facebook_id = res.rows[0].facebook_id;
              reducedObject.token = res.rows[0].token;
              reducedObject.token_timestamp = res.rows[0].token_timestamp;
              reducedObject.profile_image = res.rows[0].profile_image;

              response.status(201).send(reducedObject);
            }
          })
          .catch(err => {
            response.status(500).send(err);
            client.release();
          });
        release();
      }
    });
  }
};
