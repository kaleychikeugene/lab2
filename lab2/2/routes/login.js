const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if (!err) {
            req.logIn(user, function(err){
                if (!err) {
                    return res.redirect('/');
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    })(req, res, next);
});

module.exports = router;