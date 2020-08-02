let express = require('express'),
    router = express.Router(),
    connection = require('../dbConnect');

router.get('/',function(req,res,next){
    
    connection.query('select * from tasks;',function(err,result,fields){
        if(err){
            res.render('viewTask',{title:'Error'});
        }
        else{
            let tasks = Object.values(JSON.parse(JSON.stringify(result)));
            res.render('viewTask',{'title':"Create Task",'tasks':tasks});
        }
    });

});

module.exports = router;
