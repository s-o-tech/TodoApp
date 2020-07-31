var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


//add

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mysql = require('mysql'),
    session = require('express-session'),
    knex = require('knex')({
      client:'musql',
      connection:{
        host:'localhost',
        user:'root',
        password:'roottoor',
        database:'todoapp',
        charset:'utf-8'
      }
    }),
    Bookshelf = require('bookshelf')(knex),
    User = Bookshelf.Model.extend({
      tableName:'users'
    });

//signin page
let signinRouter = require('.routes/signin');

app.use('/signin');
app.use(session({
  secret: "Passport ",
  resave: false,
  saveUninitialized: true,
  cookie:{
    httpOnly:false,
    secure:false,
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// authentication
passport.serializeUser(function(username, done) {
  console.log('serializeUser');
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserializeUser');
  done(null, {name:username});
});

passport.use(new localStrategy({
  usernameField:'username',
  passwordField:'password',
  passReqToCallback: true,
  session:false,
},function(req,username,password,done){
  process.nextTick(function(){
    let reqName = req.body.username,
        reqPass = req.body.password;
    User.query({where: {username:reqName}, andWhere:{password:reqPass}})
    .fetch().then((model) => {
      if(model){
        return done(null,username);
      }else{
        console.log('Login Error');
        return done(null,false,{message:'パスワードが正しくありません'});
      }
    });
  });
}));

app.post('/signin',
  passport.authenticate('local',{
    failureRedirect: "/signin"
  }
  ),
  function(req, res, next){
    // res.redirect("/")でreq.userが渡せなかったので、ここでfetchを使っています。
    // https://github.com/jaredhanson/passport/issues/244
    // fetchは以下のようにインストール
    // npm install --save isomorphic-fetch
    // var fetch = require('isomorphic-fetch');
    fetch("http://localhost:3000/signin",
      {
        credentials: "include"
      }
    ).then(function(){
      res.redirect("/");
    }).catch(function(e){
      console.log(e);
    });
  }
);