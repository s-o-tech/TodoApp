let mysql = require('mysql'),
    dbConfig = {
        host:'localhost',
        user:'root',
        password:'roottoor',
        database:'TODOAPP'
    },
    connection;

(function dbInit(){
    connection = mysql.createConnection(dbConfig);
    connection.connect(function(err){
        if(err){
          console.log('error connecting:' + err.stack);
          return;
        }
        console.log('connect success');
    });
    module.exports = connection;
})();


