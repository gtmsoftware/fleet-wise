const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const crypto = require('crypto');
const cookieSession = require('cookie-session');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const loadingRouter = require('./routes/loading');
const unloadingRouter = require('./routes/unloading');
const reportRouter = require('./routes/report');
const profileRouter = require('./routes/profile');
const masterRouter = require('./routes/master');
const loginRouter = require('./routes/login');
const startRouter = require('./routes/startRouter');

const nonceMiddleware = require('./middleware/randomNonce');

const { generateNonce, getCSPHeader } = require('./config_csp');

const app = express();

//Security Setup

// 1) Reduce Fingerprinting
app.disable('x-powered-by');

// 2) Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
// app.use(helmet());

/**
 * by default helmet will block your page scripts e.g. AJAX requests, so when using defaults you will get error such as:
 *  Content Security Policy: The page's settings blocked the loading of a resource at inline ("default/src") or similar,
 *  to fix this I needed to write helmet options manually.
 */

// Use Nonce Custom Middleware to Generate a random nonce
//app.use(nonceMiddleware);

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: false,
//     "block-all-mixed-content": true,
//     "upgrade-insecure-requests": true,
//     directives: {
//       "default-src": [
//           "'self'"
//       ],
//       "base-uri": "'self'",
//       "font-src": [
//           "'self'",
//           "https:",
//           "data:"
//       ],
//       "frame-ancestors": [
//           "'self'"
//       ],
//       "img-src": [
//           "'self'",
//           "data:"
//       ],
//       "object-src": [
//           "'none'"
//       ],
//     //   "script-src": [
//     //       "'self'",
//     //       "https://cdnjs.cloudflare.com",
//     //       "https://code.jquery.com",
//     //       "https://cdn.datatables.net",
//     //       `nonce-${generateNonce()}`
//     //   ],
//     //   "script-src-attr": "'none'",
//     //   "style-src": [
//     //       "'self'",
//     //       "https://cdnjs.cloudflare.com",
//     //       "https://code.jquery.com",
//     //       "https://cdn.datatables.net"
//     //   ],
//     },
//   }),
//   helmet.dnsPrefetchControl({
//       allow: true
//   }),
//   helmet.frameguard({
//       action: "deny"
//   }),
//   helmet.hidePoweredBy(),
//   helmet.hsts({
//       maxAge: 123456,
//       includeSubDomains: false
//   }),
//   helmet.ieNoOpen(),
//   helmet.noSniff(),
//   helmet.referrerPolicy({
//       policy: [ "origin", "unsafe-url" ]
//   }),
//   helmet.xssFilter()
// );


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

//
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
// app.use(limiter)


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
app.use('/login', loginRouter);

app.use('/start', startRouter);


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

// Set up session
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


module.exports = app;
