var express = require('express');
var router = express.Router();
const {User} = require('../models')
const bcrypt = require('bcrypt');
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async(req, res, next) => {
  try {
    let errors = []
    const {username, password, password2} = req.body
    if (password !== password2) {
      errors.push({message: "Passwords do not match"})
    }
    if(errors.length > 0) {
      res.render('register', {errors})
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({username, password: hashedPassword})
      req.flash("success_msg", "You are now registered. Please log in")
      res.redirect('/users/login')
    }
  } catch(err) {
    next(err)
  }
});

router.get('/logout', (req, res) => {
  req.logout()
  req.flash("success_msg", "You have logged out.")
  res.redirect('/users/login')
})

module.exports = router;
