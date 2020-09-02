var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const { secret_password, secret_session } = require('./secret.json');



var app = express();

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
var userRouter = require('./routes/user/user');
app.use('/user', userRouter);

var loginUser = require('./routes/user/login');
app.use('/user/login', loginUser);

var announceUser = require('./routes/user/announce');
app.use('/user/announce', announceUser);

// work zone
var workRouter = require('./routes/work/work');
app.use('/work', workRouter);

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
