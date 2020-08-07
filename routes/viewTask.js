const { deserializeUser } = require('passport');

let express = require('express'),
    router = express.Router(),
    connection = require('../dbConnect');

router.get('/',function(req,res,next){
    
    connection.query('select users.username,tasks.message,tasks.percent from tasks join users on tasks.target=users.id;',function(err,result,fields){  
        if(err){
            res.render('viewTask',{title:'Error',isAuth:req.isAuthenticated()});
        }
        else{
            let tasks = Object.values(JSON.parse(JSON.stringify(result)));
            res.render('viewTask',{'title':"Create Task",'tasks':tasks,isAuth:req.isAuthenticated()});
        }
    });

});

module.exports = router;
