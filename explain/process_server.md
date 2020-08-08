# make TodoApp
## 1. 導入
### 1. 雛形を生成してくれる`express-generator`を導入
```bash
npm install express-generator -g
```
### 2. `express-generator`で`TodoApp`(任意の名前)というアプリを作成  
- 今後の作業は`TodoApp`ディレクトリ下で行います
```bash
express TodoApp --view=ejs
```
### 3. ディレクトリ移動
```bash
cd TodoApp
```
### 4. 必要なパッケージのインストール
```bash
npm install --save passport passport-local express-session mysql connect-flash
```
```bash
npm install
```
***

## 2. install MySQL
### 1. install
```bash
brew install mysql
```
### 2. check version
```bash
mysql --version
```
- result
```bash
user@MacBook-Pro TodoApp % mysql --version
mysql  Ver 8.0.21 for osx10.15 on x86_64 (Homebrew)
```
***
## 3. Run MySQL server
### 1. start mysql server
MySQLサーバーを起動
```bash
mysql.server start
```
止めたい場合は
```bash
mysql.server stop
```

### 2. make root user
```bash
mysql_secure_installation
```
このコマンドで行うこと
- パスワード強度の設定
  - LOW : **8文字**以上
  - MEDIUM : LOWの条件+数字,アルファベットの大小文字,特殊文字を**それぞれ1つ**以上
  - STRONG : MEDIUMの条件+辞書ファイルでの確認
- rootアカウントのパスワード設定
- anonymousの削除
- testデータベースの削除

`y or n(Yes or No)`の質問は基本的に全て`y`を押す  
パスワード強度の設定では`MEDIUM`を推奨  
rootパスワードの設定は**自身が設定した強度のルール**に沿ったものにする必要がある


### 3. login mysql server
先ほど設定したパスワードを入力し`root`ユーザーでログイン
```bash
mysql -uroot -p
```

***
## 4. Set up database

### 1. make database
アプリで使用するデータベースを作成する  
`root`ユーザーでMySQLサーバーにログインした状態で行う  

SQLのコマンドは**大文字小文字は同じ文字**として認識される
```sql
mysql>CREATE DATABASE TODOAPP;
```
実際に打つコマンドは`mysql>`の右から,つまり`CREATE DATABASE TODOAPP;`のみ
### 2. use database
これから`TODOAPP`データベースを使うよ！と宣言
```sql
mysql>use TODOAPP;
```

### 3. make table
#### make users table
- テーブル構造はあとで説明します
```sql
mysql>create table users (id int not null primary key AUTO_INCREMENT, username varchar(20) not null unique, password varchar(20) not null, isAdmin boolean);
```
#### make tasks table
```sql
mysql>create table tasks (id int not null primary key AUTO_INCREMENT, title varchar(100) not null, message varchar(500) not null, percent int default 0,target int not null);
```

#### insert values
```sql
insert into users values (0,'user','password',False);
insert into tasks values (0,'hello','world',0,0);
```
### TIPS : AUTO_INCREMENT
> 値に`null`か`0`を指定すると自動的に連番を割り当ててくれる  
値の指定も可能(重複するとエラーが発生)
挿入エラーが発生しても自動的に1増やしてしまうため欠番が発生することがある  
最大値は`signed int(11)`の2147483647  


#### show users table columns
```sql
show columns from users;
```
- result
```sql
mysql> show columns from users;
+----------+-------------+------+-----+---------+----------------+
| Field    | Type        | Null | Key | Default | Extra          |
+----------+-------------+------+-----+---------+----------------+
| id       | int         | NO   | PRI | NULL    | auto_increment |
| username | varchar(20) | NO   | UNI | NULL    |                |
| password | varchar(20) | NO   |     | NULL    |                |
| isAdmin  | tinyint(1)  | YES  |     | NULL    |                |
+----------+-------------+------+-----+---------+----------------+
4 rows in set (0.01 sec)
```

#### check table
実際に挿入したデータを確認したい時に使用
```sql
select * from users;
select * from tasks;
```
#### delete users table
テーブルを削除したいときに使用
```sql
drop table users;
drop table tasks;
```

### 4. advance
Node.jsからMySQL8.x系に接続する際にエラーが発生するため,MySQL8.x系を使用している人は以下のコードを実行  
`'password'`は自分で設定した`root`ユーザーのパスワードに変更
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```

***

## 5. Run TodoApp

### 1. Check directory structure
TodoAppディレクトリは以下のような構造になっています

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.ejs
    └── index.ejs

```
各項目の説明
- app.js
  - アプリのメインプログラム
  - アプリ全体に共通する処理や設定を書く
- bin
  - サーバープロセスの起動処理を行うディレクトリ
  - `npm start`では直下のwwwファイルを実行している
    - これは`package.json`にデフォルトで`"start": "node ./bin/www"`と記述されているため
- package.json
  - アプリの名前やパッケージの依存関係,バージョンを記述するJSONファイル
- public
  - JavaScriptやCSS,画像などの静的コンテンツを格納するディレクトリ
- routes
  - クライアントからの要求(GET,POST等)に対して,どのような処理を行うか記述するディレクトリ
- views
  - ejsファイルを格納するディレクトリ

### 2. Run 
アプリを実行するには
```bash
npm start
```
ブラウザから`localhost:3000`にアクセスし以下の画面が出れば成功
![HelloWorld](./img/express_HelloWorld.png)
