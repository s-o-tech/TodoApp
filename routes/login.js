let express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.get('/',function(req,res,next){
    res.render('login',{title:"Login",isAuth:req.isAuthenticated(),errorMessage:req.flash('error')});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/mypage',
    failureRedirect: '/login',
    failureFlash: true
  }
));

module.exports = router;