var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { secret_password, secret_session, secret_announce } = require('./secret.json');

var app = express();
app.locals.moment = require('moment');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create session
app.set('trust proxy', 1)
app.use(session({
  secret: secret_session,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));


// index zone
var indexRouter = require('./routes/index/index');
app.use('/', indexRouter);

// user zone
var userRouter = require('./routes/user/index');
app.use('/user', userRouter);

var loginUser = require('./routes/user/login');
app.use('/user/login', loginUser);

var signupUser = require('./routes/user/sign-up');
app.use('/user/sign-up', signupUser);

var announceUser = require('./routes/user/announce');
app.use('/user/announce', announceUser);

var userInfo = require('./routes/user/info');
app.use('/user/info', userInfo);

var changePicUser = require('./routes/user/changpic');
app.use('/user/change_picture', changePicUser);

var manageWorkUser = require('./routes/user/manage-work');
app.use('/user/manage-work', manageWorkUser);

var editAnnounceUser = require('./routes/user/edit-announce');
app.use('/user/edit-announce', editAnnounceUser);

// work zone
var workRouter = require('./routes/work/index');
app.use('/work', workRouter);

var workInfo = require('./routes/work/info');
app.use('/work/info', workInfo);

var viewMoreWork = require('./routes/work/view_more');
app.use('/work/view_more', viewMoreWork);

// apizone
var apiRouter = require('./routes/api/api');
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {title : "ไม่พบหน้านี้"});
});

module.exports = app;
