var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('config');
var session = require('express-session');
var flash = require('connect-flash');
var _ = require('underscore');

// Database connection & models
var mongoose = require('mongoose');
mongoose.connect(config.db_uri, { autoIndex: false });
var Post = require('./models/post');
var User = require('./models/user');



// User.findOneAndUpdate({
//   username: 'demo',
// }, {
//   description: 'A special first user.',
//   location: 'On the cloud',
// }, function (err, user) {});

// User.findOneAndUpdate({
//   username: 'morph',
// }, {
//   description: 'Doctor.\nSecret Laboratories.',
//   location: 'NY',
//   link: 'http://9v.lt/blog/category/general/dr-noire-by-recon/',
//   quote: 'Sit down, Mr. Naissance. I’ve got a job for you.',
// }, function (err, user) {});

// User.findOneAndUpdate({
//   username: 'saens',
// }, {
//   fullName: 'Camille Saint-Saëns',
//   location: 'France',
//   link: 'https://en.wikipedia.org/wiki/Introduction_and_Rondo_Capriccioso',
// }, function (err, user) {});

// Post.findOneAndUpdate({
//   type: 'code',
// }, {
//   body: 'Second post by the second user.\n\nIts font is monospaced.',
// }, function (err, post) {});

// Post.findOneAndUpdate({
// }, {
//   body: 'I am creating a social network! Yes. Just like the movie!\r\n\r\nFork me on GitHub!',
// }, function (err, post) {});



var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
// var accountRouter = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

config.logger && app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressLayouts);
app.use(session({
  secret: 'wasdsafeAD',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));
app.use(flash());

// Dynamic helpers for res.locals
app.use(function (req, res, next) {
  if (req.session.userId) {
    User.findById(req.session.userId, function (err, user) {
      if (err || !user) {
        req.session.destroy();
        req.flash('error', 'You were logged out automatically.');
        res.redirect('/login');
      } else {
        res.locals.user = res.locals.me = user;
      }
    });
  } else {
    res.locals.user = {
      fullName: 'Anonymous',
      description: 'A stalker looming in the dark..',
      location: 'Some secure VPN!?',
      quote: 'Everyone is a moon, and has a dark side which he never shows to anybody.',
    };
  }
  res.locals.escapeBody = function (body) {
    return _.escape(body).replace(/\r\n/gmi, '<br>');
  };
  res.locals.userId = req.session.userId;
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
// app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = (err.status || 500 ) + ' ' + err.message;
  res.locals.error = {};
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
