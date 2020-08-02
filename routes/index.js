let express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect('login');
  }
});

module.exports = router;
