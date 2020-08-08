let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),

    indexRouter = require('./routes/index'),
    loginRouter = require('./routes/login'),
    logoutRouter = require('./routes/logout'),
    okRouter = require('./routes/ok'),
    registerRouter = require('./routes/register'),
    createTaskRouter = require('./routes/createTask'),
    viewTaskRouter = require('./routes/viewTask'),
    mypageRouter = require('./routes/mypage'),

    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    connection = require('./dbConnect');
    app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
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
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy({
  usernameField: "username", 
  passwordField: "password", 
},function(username, password, done) {
    connection.query(`select * from users where username="${username}"`,function(err,users){
      if(users != undefined && users.length == 1 && users[0].password == password){
        return done(null,users[0]);
      }
      else if(users.length == 0){
        return done(null,false,{message:"Invalid UserName"});
      }
      else{
        return done(null,false,{message:"Invalid Password"});
      }
    });
  }
));

//route
app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/ok',okRouter);
app.use('/logout',logoutRouter);
app.use('/register',registerRouter);
app.use('/createTask',createTaskRouter);
app.use('/viewTask',viewTaskRouter);
app.use('/mypage',mypageRouter);

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
