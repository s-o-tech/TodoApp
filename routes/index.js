var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){
    console.log('success');
    res.render('index', { title: 'Express' });
  }
  else{
    res.redirect('login');
  }
});

module.exports = router;
