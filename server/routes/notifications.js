
const router = require('express').Router();
const db = require('../models/models.js');

router.get('/', (req, res) => {
  db.checkNotifications(req.query.id_user, res);
});

module.exports = router;