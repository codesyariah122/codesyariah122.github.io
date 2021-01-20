---
layout: post
title:  "installing ruby"
author: puji
categories: [Ruby]
image: assets/images/post/ruby.png
tags: [ruby]
opening: بسم الله الرحمن الرحيم
---  

{{page.opening}}  

![rails2]({{site.url}}/assets/images/post/ruby.png)  

# install ruby di debian 9  

Ruby adalah salah satu bahasa paling populer saat ini. Ruby memiliki sintaks yang elegan dan merupakan bahasa di balik framework Ruby on Rails yang kuat.

Dalam tutorial ini kami akan menunjukkan kepada Anda tiga cara berbeda untuk menginstal Ruby pada sistem Debian 9.  

### install ruby dari repository debian 9  
Cara termudah untuk menginstal Ruby di sistem Debian Anda adalah melalui apt package manager. Pada saat penulisan, versi di repositori Debian adalah 2.3.3 yang mana akan segera EOL (End of Life).  
Untuk menginstal Ruby dari repositori default Debian, ikuti langkah-langkah ini:  
1 . perbarui index paket :  
```
apt update
apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev
```
2. install ruby dengan mengetik :  
```
apt install ruby-full
```  
3. cek versi ruby : 
```
ruby --version
```  
outputnya adalah seperti ini 

```bash 
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]
```  

### Install ruby menggunakan rbenv  
Rbenv adalah alat manajemen versi Ruby yang memungkinkan Anda untuk dengan mudah beralih versi Ruby. Secara default Rbenv tidak menangani masalah instalasi Ruby, sehingga kita juga perlu menginstal ruby-build yang merupakan alat yang membantu Anda menginstal versi Ruby apa pun yang mungkin Anda perlukan.

Untuk menginstal Ruby menggunakan skrip Rbenv, ikuti langkah-langkah ini: 
1. Pertama, perbarui indeks paket dan install paket yang diperukan oleh ruby-build untuk membangun ruby dari sumber :  

```bash
apt update
apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev
```  
2. Selanjutnya, jalankan perintah curl berikut untuk menginstall rbenv dan ruby-build :  

```bash
curl -sL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash -

```  

Script akan mengkloning repositori rbenv dan ruby-build dari GitHub ke direktori ``` ~/.rbenv```. Skrip installer juga memanggil skrip lain yang akan mencoba memverifikasi pemasangan. Output dari skrip akan terlihat seperti di bawah ini: 
3. Tambahkan $HOME/.rbenv/bin ke sistem PATH.
Jika Anda menggunakan Bash, jalankan:  

```bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
```  

Jika Anda menggunakanZsh, jalankan:  

```
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
source ~/.zshrc
```  

4. Install ruby versi stabil terbaru dan tetapkan sebagai versi default dengan :  

```bash
$ rbenv install 2.5.1
$ rbenv global 2.5.1
```  

Untuk melihat daftar semua versi Ruby yang tersedia, Anda dapat menggunakan: ```rbenv install -l```  
Verifikasi bahwa Ruby telah diinstal dengan benar dengan mencetak nomor versi:  

```bash
ruby --version
```  

outputnya :  

```bash
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux]
```  
Ok sekian dulu artikel mengenai proses installasi ruby di debian 9, mudah-mudahan ada manfaatnya dari artikel ini, atas segala kekurangan saya mohon maaf.  

**Wassalaam**  

***Puji Ermanto***

