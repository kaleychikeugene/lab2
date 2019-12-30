require('./passport-config');

let express = require('express');
let cookieSession = require('cookie-session')
let session = require('express-session');
let fileStore = require('session-file-store')(session);
let passport = require('passport');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let articleRouter = require('./routes/article');
let addRouter = require('./routes/add');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout');
let mongoose = require("mongoose");
let User = require('./models/User');


let app = express();

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(cookieSession({
    store: new fileStore,
    secret: 'ExpressBlog',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60,
        secure: false
    },
}));

app.use(passport.initialize());
app.use(passport.session());

let initializeUser = function() {
    User.findOne({ username: 'admin' }, function(err, doc){
        console.log(doc);
        if (!doc) {
            User.create({ username: 'admin', password: 'admin' }, function(err, doc) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}

//initializeUser();

let auth = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }
}

app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/add', auth, addRouter);
app.use('/login', loginRouter);
app.use('/logout', auth, logoutRouter);

module.exports = app;