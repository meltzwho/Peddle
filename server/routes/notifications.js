
const router = require('express').Router();
const db = require('../models/models.js');

router.get('/', (req, res) => {
  db.genNotifications(1, 'message', 123);
  db.checkNotifications(1);
  res.end();
});

module.exports = router;