let express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    req.logout();
    res.redirect('/');
  }
  else{
    res.redirect('login');
  }
});

module.exports = router;
