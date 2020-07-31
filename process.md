# install
## on MacBook Pro
[画面分割](https://www.spectacleapp.com)
[Homebrew](https://brew.sh/index_ja.html)
## install Homebrew
Paste this code on Terminal
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

回線状況によると思うが、10分ほどかかった
### check Homebrew version
`brew -v`

### result
```bash
user@MacBook-Pro ~ % brew -v
Homebrew 2.4.9
Homebrew/homebrew-core (git revision aa1b1; last commit 2020-07-31)
```


## install nodebrew
`brew install nodebrew`
### check installable nodejs version
`nodebrew ls-remote`
### make install directory
この処理を行わないとインストールの際にエラーが出る
`mkdir ~/.nodebrew/src`
or
`mkdir -p ~/.nodebrew/src`

### install latest version
`nodebrew install-binary latest`
### install stable version
`nodebrew install-binary stable`

### install list
`nodebrew ls`
### enable nodejs version
`nodebrew use vX.X.X`
`nodebrew use 14.7.0`
### check enable
`nodebrew ls`
current:vX.X.Xと表示されていたら成功
## set PATH
zshの場合(基本こっち macOS X 10.15以降はこちらがデフォルト)
`echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofile`
bashの場合
`echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bash_profile`
### check PATH
ターミナルを再起動後
`echo $PATH`
表示された中に`.nodebrew/current/bin`があればOK

## check node version
`node -v`
でバージョンが表示されれば導入完了
