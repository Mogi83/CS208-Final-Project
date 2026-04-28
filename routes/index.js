var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Downtown Donuts' });
});

/* GET Menu page */
router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Our Menu' });
});

/* GET Our Story page */
router.get('/story', function(req, res, next) {
  res.render('story', { title: 'Our Story' });
});

/* GET Testimonials page */
router.get('/testimonials', function(req, res, next) {
  // We'll add the DB query back here later to fetch comments!
  res.render('testimonials', { title: 'Community Comments' });
});

module.exports = router;