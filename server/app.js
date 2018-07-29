const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
// anti ddos
const Ddos = require('ddos');

const ddos = new Ddos({ burst: 10, limit: 15 });

// passport imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// mongo imports
const mongodb = require('mongodb');
const MongoStore = require('connect-mongo')(session);
const config = require('./config/config');
const routes = require('./routes');
const { mongoose, mongooseUrl } = require('./db/mongoose');

// var users = require("./routes/users");
const PORT = 8001;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieParserSecret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'cookie_secret',
    name: 'cookie_name',
    store: new MongoStore({ url: mongooseUrl }), // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
// app.use(ddos.express); // couse 500 error BUG

app.use(routes);

// passport initialize
const { User } = require('./db/models/UserSchema');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now listening on port ${PORT}!`);
});

module.exports = app;
