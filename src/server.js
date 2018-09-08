const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

// initializations
const app = express();

//Connection db
require('./database.config');
//authentication
require('./passport/local-authentication');


// settings
app.set('port', process.env.PORT || 4500);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/', require('./routes'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
