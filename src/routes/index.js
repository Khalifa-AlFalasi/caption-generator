const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

<<<<<<< HEAD
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/');
  })
});
=======
// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
>>>>>>> d20ae67986187bcc920a6730a25717ddfa1847f9

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err)
      return res.status(500).send(err);
    res.redirect('/');
  })
})

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), req.body.password, (err, user) => {
    if (err) {
      res.render('register', { message: 'Your registration information is not valid' });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (user) {
      req.logIn(user, (err) => {
        res.redirect('/');
      });
    } else {
      res.render('login', { message: 'Your login or password is incorrect.' });
    }
  })(req, res, next);
});

module.exports = router;
