var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) { // ログインしているユーザーが存在する場合のみ有効
    res.render("index", { title: 'Express',username:req.user.name});
  } else { // ユーザーが存在しなければ、サインインページへ飛ばされる
    res.redirect('/signin');
  }
});

module.exports = router;
