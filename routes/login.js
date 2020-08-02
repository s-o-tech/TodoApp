let express = require('express'),
    router = express.Router(),
    passport = require('passport');


router.get('/',function(req,res,next){
    res.render('login',{title:"Login Tutorial"});
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/ok',
    failureRedirect: '/login',
    session: false
  }
));



module.exports = router;