
const router = require('express').Router();
const db = require('../models/models.js');

router.get('/', (req, res) => {
  db.checkNotifications(1, res);
});

module.exports = router;