let express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',{title:'TodoApp',isAuth:req.isAuthenticated()});

});

module.exports = router;
