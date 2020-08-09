let express = require('express'),
    router = express.Router();
    connection = require('../dbConnect');

router.get('/',function(req,res,next){
    res.render('register',{title:"Registor",errorMessage:'',isAuth:req.isAuthenticated()});
});

router.post('/', function(req,res,next){
    let username = req.body.username,
        password = req.body.password;
    if(username == ''){
        res.render('register',{title:'Registor',errorMessage:'invalid username',isAuth:req.isAuthenticated()});
    }
    else if(password == ''){
        res.render('register',{title:'Registor',errorMessage:'invalid password',isAuth:req.isAuthenticated()});
    }
    else {
        connection.query(`insert into users values (0,'${username}','${password}',False);`,function(err,result,fields){
            if(err){
                res.render('register',{title:'Registor',errorMessage:`This username(${username}) is already used`,isAuth:req.isAuthenticated()});
            }
            else{
                res.redirect('ok');
            }
        });
    }
}
);
module.exports = router;
