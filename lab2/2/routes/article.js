const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', function(req, res) {
    if(req.query.id) {
        Article.findById(req.query.id, function(err, doc){
            res.render('article', { article: doc, isAuthenticated: req.isAuthenticated() });
        });
    }
});

module.exports = router;
