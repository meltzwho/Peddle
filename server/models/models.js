// const db = require('../../db/index.js').pool;


// module.exports = {
//   selectFirstUser: () => {
//     db.connect((err, client, release) => {
//       if (err) {
//         console.error('there was an error getting the pool connection');
//       } else {
//         client.query('SELECT * FROM USERS WHERE id_users=$1', [1], (err, res) => {
//           release();
//           if (err) {
//             console.log(err.stack);
//           } else {
//             console.log(res.rows[0]);
//           }
//         });
//       }
//     });
//   }
// }