var express = require('express');
var router = express.Router();
const {Envelope} = require('../models')

/* GET home page. */
router.get('/', async (req, res, next) => {
  if(req.isAuthenticated()) {
    try {
      const userEnvelopes = await Envelope.findAll({where: {user_id: req.user.id}})
      res.render('index', { user: req.user.username, userEnvelopes });
    } catch(err) {
      next(err)
    }
  } else {
    res.redirect('/users/login')
  }
});

module.exports = router;
