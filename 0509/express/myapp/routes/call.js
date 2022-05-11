const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    console.log('wow');
    res.send('hello express');
  });

  router.get('/member', function(req, res) {
    res.send('call member');
  });

  router.get('/member/:id', function(req, res) {
    const member = req.params.id;
    console.log(member);
    res.send('member '+member);
  });

module.exports = router;