const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', function(req, res) {
  Article.find({}, function(err, docs){
    res.render('index', { articles: docs, isAuthenticated: req.isAuthenticated()});
  });
});

module.exports = router;
