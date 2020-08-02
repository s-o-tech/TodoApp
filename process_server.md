# make TodoApp
## first
雛形を生成してくれるもの
`npm install express-generator -g`
`express AppName --view=ejs`
`cd AppName`
`npm install`
`npm install --save passport`
`npm install --save passport-local`
`npm install --save express-session`
`npm install --save mysql`
`npm install --save knex`
`npm install --save bookshelf`

npm -i で一括インストール推奨

## install mysql
`brew install mysql`
### check info
`brew info mysql`

## start mysql server
`mysql.server start`
## stop mysql server
`mysql.server stop`

## make root user
`mysql_secure_installation`

## login mysql server
`mysql -uroot -p`

# make usertable
`mysql>create database TODOAPP;`
`mysql>use TODOAPP;`
## make users table
`mysql>create table users (id int not null primary key AUTO_INCREMENT, username varchar(20) not null unique, password varchar(20) not null, isAdmin boolean);`
## make tasks table
`mysql>create table tasks (id int not null primary key AUTO_INCREMENT, title varchar(100) not null, message varchar(500) not null, percent int default 0,target int not null);`

`insert into tasks values (0,'hello','you should print hello world',0,0);`
## show users table columns
`show columns from users;`
ほぼYes
passはLOW(0）でも良いかな


## add values
`insert into users values (0,'admin','passw0rd');`
0は固定で良い
詳しくは、auto_incrementの仕様を確認

## check users table
`select * from users;`
## delete users table
`drop table users;`



# write login part

## 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'roottoor';
