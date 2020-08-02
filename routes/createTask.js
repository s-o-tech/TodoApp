let express = require('express'),
    router = express.Router(),
    connection = require('../dbConnect');

router.get('/',function(req,res,next){
    if(req.isAuthenticated() && req.user.isAdmin){
        connection.query('select id,username from users;',function(err,result,fields){
            if(err){
                res.render('createTask',{title:'Error'});
            }
            else{
                let users = Object.values(JSON.parse(JSON.stringify(result)));
                res.render('createTask',{'title':"Create Task",'users':users});
            }
        });
    }
    else{
        res.status(404);
        res.end('not found');
    }
});

router.post('/', function(req,res,next){
    if(req.isAuthenticated() && req.user.isAdmin){
        console.log(req.body);
        let title = req.body.title,
            message = req.body.message,
            targetID = 0;
            //insert into tasks values (0,'hello','you should print hello world',0,0);
        connection.query(`insert into tasks values (0,'${title}','${message}',0,${targetID});`,function(err,result,fields){
            if(err){
                res.render('createTask',{title:`Error`});
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
    
}
);
module.exports = router;
