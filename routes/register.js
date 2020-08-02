let express = require('express'),
    router = express.Router();
    connection = require('../dbConnect');

router.get('/',function(req,res,next){
    res.render('register',{title:"Registor Tutorial"});
});

router.post('/', function(req,res,next){
    let username = req.body.username,
        password = req.body.password;
    connection.query(`insert into users values (0,'${username}','${password}',False);`,function(err,result,fields){
        if(err){
            res.render('register',{title:`This username(${username}) is already used`});
        }
        else{
            res.redirect('ok');
        }
    });
}
);
module.exports = router;
