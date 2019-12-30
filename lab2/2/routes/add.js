const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/', function(req, res) {
    res.render('add', { isAuthenticated: req.isAuthenticated()});
});

router.post('/', function(req, res) {
    const title = req.body.title;
    const preview = req.body.preview;
    const text = req.body.text;

    if(title && preview && text) {
        Article.create({ title: title, preview: preview, text: text }, function(err, doc){
            if(err) return console.log(err);
            res.redirect('/');
        });
    }
});

module.exports = router;