---
layout: post
title:  "installing ruby"
author: puji
categories: [Ruby]
image: /public/images/post/ruby.png
tags: [ruby]
opening: بسم الله الرحمن الرحيم
---  
![rails2]({{site.url}}/public/images/post/ruby.png)  
## installing ruby on debian  
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

apt-get update

apt-get install git-core zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev nodejs yarn

git clone https://github.com/rbenv/rbenv.git ~/.rbenv

echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

echo 'eval "$(rbenv init -)"' >> ~/.bashrc

exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc

exec $SHELL

rbenv install 2.4.2

rbenv global 2.4.2

gem install bundler

gem install rails

rbenv rehash 
```
gem update --system
```  
### installing ruby using rbenv  

Rbenv is a lightweight Ruby version management tool which allows you to easily switch Ruby versions. By default Rbenv doesn’t handle installing Ruby versions so we also need to install ruby-build which is a tool that helps you to install any version of Ruby you may need. It is available as a standalone program and as a plugin for rbenv.

To install Ruby using the Rbenv script, follow these steps: 
- First, update the packages index and install the packages required for the ruby-build tool to build Ruby from source: 
```
apt update
apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev
```  

- Next, run the following curl command to install both rbenv and ruby-build:  
```
curl -sL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash -
```  

- Add $HOME/.rbenv/bin to the user PATH.

If you are using Bash, run:  

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```  
If you are using Zsh run: 
 
```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
```  

- Install the latest stable version of Ruby and set it as a default version with  
```
rbenv install 2.5.1
rbenv global 2.5.1
```  
To list all available Ruby versions you can use: ```rbenv install -l```  
Verify that Ruby was properly installed by printing the version number:  
```
ruby -v
```  
```
output: 
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]
```  