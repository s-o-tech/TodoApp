var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let indexRouter = require('./routes/index'),
    loginRouter = require('./routes/login'),
    logoutRouter = require('./routes/logout'),
    okRouter = require('./routes/ok'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    mysql = require('mysql'),
    connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'roottoor',
      database:'TODOAPP'
    })
    app = express();

//
connection.connect(function(err){
  if(err){
    console.log('error connecting:' + err.stack);
    return;
  }
  console.log('connect success');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy({
  usernameField: "username", 
  passwordField: "password", 
},function(username, password, done) {
    connection.query(`select * from users where username="${username}"`,function(err,users){
      if(users != undefined && users.length == 1 && users[0].password == password){
        return done(null,username);
      }
      else{
        return done(null,false);
      }
    });
  }
));


app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/ok',okRouter);
// app.use('/logout',logoutRouter);

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
