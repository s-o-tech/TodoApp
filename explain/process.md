# install Nodejs
## on MacBook Pro

[Homebrew](https://brew.sh/index_ja.html)を使いNodejsをインストールします
***
## install Homebrew
### 1. Paste this code on Terminal  
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
- 回線状況によると思うが、筆者は10分ほどかかった
### 2. check Homebrew version
```bash
brew -v
```


### result
```bash
user@MacBook-Pro ~ % brew -v
Homebrew 2.4.9
Homebrew/homebrew-core (git revision aa1b1; last commit 2020-07-31)
```
このように表示されればOK

***
## install Nodebrew
### 1. Paste this code on Terminal
```bash
brew install nodebrew
```
### 2. check installable nodejs version
```bash
nodebrew ls-remote
```
### 3. make install directory
この処理を行わないとインストールの際にエラーが出る

```bash
mkdir -p ~/.nodebrew/src
```

***

## install nodejs

### 1. install
#### 1.1 install latest version  
- 最新版をインストールしたい場合
```bash
nodebrew install-binary latest
```
#### 1.2 install stable version
- 安定版をインストールしたい場合
```bash
nodebrew install-binary stable
```

### 2. install list

```bash
nodebrew ls
```
### 3. enable nodejs version

```bash
nodebrew use vX.X.X
```
- node version が 14.7.0の時
```bash
nodebrew use 14.7.0
```
### 4. check enable
```bash
nodebrew ls
```
- このように`current:vX.X.X`と表示されていたら成功
```bash
user@MacBook-Pro ~ % nodebrew ls
v14.7.0

current: v14.7.0
```
***
## set PATH
### 1. Paste this code on Terminal
zshの場合(基本こっち macOS X 10.15以降はこちらがデフォルト)
```bash
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofile
```
bashの場合
```bash
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile
```
### 2. check PATH
ターミナルを再起動後
```bash
echo $PATH
```
表示された中に`.nodebrew/current/bin`があればOK  
 
### result
```bash
/Users/user/.nodebrew/current/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
先頭から1つ目のコロンの間に表示されている
### 3. check node version
```bash
node -v
```
でバージョンが表示されれば導入完了
