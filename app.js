const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loadingRouter = require('./routes/loading');
const unloadingRouter = require('./routes/unloading');
const reportRouter = require('./routes/report');
const profileRouter = require('./routes/profile');
const masterRouter = require('./routes/master');

const app = express();

//Security Setup

// 1) Reduce Fingerprinting
app.disable('x-powered-by');

// 2) Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(helmet());

//Use cookies securely
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 's3Cur3',
//   name: 'sessionId'
// }));


// Added Rate Limitter to prevent Bruit-force Attack
const rateLimiterRedisMiddleware = require('./middleware/rateLimiterRedis');
// Uncomment it for Production
// app.use(rateLimiterRedisMiddleware);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/loading', loadingRouter);
app.use('/unloading', unloadingRouter);
app.use('/report', reportRouter);
app.use('/profile', profileRouter);
app.use('/master', masterRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
