let express = require('express'),
    router = express.Router(),
    connection = require('../dbConnect');

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    let target = req.user.id;
    connection.query(`select * from tasks where target=${target};`,function(err,result,field){
        if(err){
            res.render('mypage',{title:'Error',isAuth:req.isAuthenticated()});
        }
        else{
            let tasks = Object.values(JSON.parse(JSON.stringify(result))),
                username = req.user.username,
                isAdmin = req.user.isAdmin;
            res.render('mypage',{'title':'mypage','tasks':tasks,'username':username,isAuth:req.isAuthenticated(),isAdmin:isAdmin});
        }
    });
  }
  else{
    res.redirect('login');
  }
});

router.post('/', function(req,res,next){
  if(req.isAuthenticated() && req.body.target == req.user.id){
      let per = req.body.newPercent,
          taskID = req.body.taskID;
          //update tasks set percent=1 where id=3;
      connection.query(`update tasks set percent=${per} where id=${taskID};`,function(err,result,fields){
          if(err){
              res.render('mypage',{title:'mypage',message:`Error`,isAuth:req.isAuthenticated()});
          }
          else{
              res.redirect('ok');
          }
      });
  }
  else{
      res.status(404);
      res.end('not found')
  }
  
});


module.exports = router;
