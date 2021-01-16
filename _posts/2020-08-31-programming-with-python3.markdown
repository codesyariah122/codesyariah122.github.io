---
layout: post
title:  "Belajar programming dengan python"
author: puji
categories: [ Python, programmer ]
image: assets/images/post/python2.png
tags: [python]
opening: بسم الله الرحمن الرحيم
---  
![Source_bashrc]({{site.url}}/assets/images/post/python.jpg)  

### About Python  
Halo ! coders semuanya udah beberapa hari ini gak nulis lagi di blogg ini. ada kabar baru apakah hari ini ? 🏖, apakah ada yang sibuk dengan holiday, sekali-kali liburan itu dijadikan sebagai kesibukan. jangan cuma selingan saja. 🥶🥳. Bagi yang sedang kurang fit, kurang sehat(badan maksudnya alias sakit), semoga lekas sembuh yah coders semua.  

ok dalam artikel kali ini gout mau berbagi kisah dan cerita mengenai pemrogramman python. yah python 🥵 ? apakah ada yang salah ? mudah-mudahan tidak ada yang terganggu dengan namanya, emang sih ada juga kaitannya dengan ***Reptile*** yang sangat terkenal di dunia ((invertebrata)) hewan tak bertulang belakang ini sangat suka melilit-lilit mangsanya dengan lilitan kuatnya bagaikan sebuah mesin peremuk/penghancur bahan baja, hebat yah. Reptil ini juga dikenal sangat tenang dalam menaklukan mangsanya. selain dikenal dengan lilitannya reptil yang satu ini adalah sang pembunuh berdarah dingin. ok sekian pembahasan mengenai python di dunia alam rimba ini. karena fokus kita buka kepada spesies tersebut. 🙈🙈🙈  

#### Masuk angin .. eh salah 🤦🤦🤦 masuk ke topik  🦹
masuk ke topik utama kita, 🙇 membahas sebuah programming language yang sudah sangat terkenal di kalangan para programmer, developer, enginer ataupun ilmuwan. python memang bahasa yang powerfull dari penjelasan mengenai python dalam berbagai pembahasan di media-media dan artikel-artikel di dunia digital.  
Python adalah salah satu bahasa pemrograman yang dapat melakukan eksekusi sejumlah instruksi multi guna secara langsung (interpretatif) dengan metode orientasi objek (Object Oriented Programming) serta menggunakan semantik dinamis untuk memberikan tingkat keterbacaan syntax. Sebagian lain mengartikan Python sebagai bahasa yang kemampuan, menggabungkan kapabilitas, dan sintaksis kode yang sangat jelas, dan juga dilengkapi dengan fungsionalitas pustaka standar yang besar serta komprehensif. Walaupun Python tergolong bahasa pemrograman dengan level tinggi, nyatanya Python dirancang sedemikian rupa agar mudah dipelajari dan dipahami.

Python sendiri menampilkan fitur-fitur menarik sehingga layak untuk Anda pelajari. Pertama, Python memiliki tata bahasa dan script yang sangat mudah untuk dipelajari. Python juga memiliki sistem pengelolaan data dan memori otomatis. Selain itu modul pada Python selalu diupdate. Ditambah lagi, Python juga memiliki banyak fasilitas pendukung. Python banyak diaplikasikan pada berbagai sistem operasi seperti Linux, Microsoft Windows, Mac OS, Android, Symbian OS, Amiga, Palm dan lain-lain.  

begitulah sisi baik dari python ini, banyak sekali kelebihan dari python ini.  

#### Sejarah Perkembangan Python  
Python dibuat dan dikembangkan oleh Guido Van Rossum, yaitu seorang programmer yang berasal dari Belanda. Pembuatannya berlangsung di kota Amsterdam, Belanda pada tahun 1990. Pada tahun 1995 Python dikembangkan lagi agar lebih kompatibel oleh Guido Van Rossum. Selanjutnya pada awal tahun 2000, terdapat pembaharuan versi Python hingga mencapai Versi 3 sampai saat ini. Pemilihan nama Python sendiri diambil dari sebuah acara televisi yang lumayan terkenal yang bernama Mothy Python Flying Circus yang merupakan acara sirkus favorit dari Guido van Rossum.  

# Installasi Python  
dan kita memasuki tahap installasi Python3, banyak cara, banyak penerapan untu melakukan installasi bahasa python di device kita.  
sementara untuk artikel kali ini gout akan bahas mengenai ***install*** python3 di **Operating System** Linux, disini gout pakai :  
```bash
root@codesyariah:/home/puji122# lsb_release -a
No LSB modules are available.
Distributor ID:	Debian
Description:	Debian GNU/Linux 9.13 (stretch)
Release:	9.13
Codename:	stretch
```  
#### Tahap-tahap install python  
ok langsung ajah kita ke step demi step dalam menginstall ***Python***. untuk linux, kita bisa langsung menuju ***terminal*** atau kalau di windows itu ***command prompt***. begini langkat install nya :  

```bash
# buka terminal 
# install package dan library yang dibutuhkan untuk python
apt-get install build-essential checkinstall
apt-get install libreadline-gplv2-dev libncursesw5-dev libssl-dev \
    libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev libffi-dev zlib1g-dev
# kemudian kita download dulu source python nya :
# sesuaikan dengan direktori kalian (bebas) disini gout download di home direktori distro debian gout
cd /home/puji122/
wget https://www.python.org/ftp/python/3.8.5/Python-3.8.5.tgz
# kemudian ekstrak hasil download tadi
tar xzf Python-3.8.5.tg
# setelah di ekstrak kita aksess direktori python tersebut
cd Python-3.*
# lakukan configurasi terlebih dahulu untuk source pythonnya
./configure --enable-optimizations
# kemudian proses eksekusi installasi python
make altinstall

# tunggu sampai prosess installasi Python-3.8 selesai 
```  
setelah proses install selesai, check versi pythonnya : 
```bash
python --version
root@codesyariah:/home/puji122# python --version
# jika seperti ini berarti python sudah di versi 3.8
Python 3.8.5
```  
installasi python3 selesai.

***update version***  
jika kalian sebelumnya menginstall versi di bawahnya atau misalnya python versi sebelumnya seperti **Python-2.7**, setelah kalian tadi menginstall python dan check versi ternyata versi nya belum berubah ke ```Python-3.8.5```, tenang saja, kalian bisa merubahnya di source bash, begini caranya :  
***Kembali ke terminal***  

```bash
# buka dengan editor di terminal
nano ~/.bashrc
# atau 
nano ~/.bash_aliases

# kemudian cari baris atau line ***alias***
# jika belum ada alias untuk python, tambahkan :
# tambahan seperti ini
alias python=python3.8
```  
![Source_bashrc]({{site.url}}/assets/images/post/source-python.png)  

jika sudah eluar dari terminal dengan menekan shortcut key : ```ctr+x``` kemudian ```save```. keluar (exit) dari terminal. selanjutnya restart bashrc nya :  
```bash
source ~/.bashrc
# atau
source ~/.bash_aliases
```  
setelah itu check kembali versi pythonnya :  
```bash
python --version
# apakah sudah seperti ini :
root@codesyariah:/home/puji122# python --version
Python 3.8.5
```  
#### Menjalankan python interactive  
sama seperti pemrograman lain seperti : ```java, C, C++, perl, atau javascript(Node.js)```. python ini bisa di jalankan secara interactive di shell(terminal) kita langsung:  
```bash
# buka terminal kembali
# kemudian jalankan python
python

# keluar interactive python seperti ini : 

Python 3.8.5 (default, Sep  1 2020, 23:05:57) 
[GCC 6.3.0 20170516] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 1 + 1
2
>>> print("Puji Ermanto")
Puji Ermanto
>>> print("Hello World")
Hello World
>>> namaKamu = "Iim Marlina"
>>> print("Nama kamu : {}".format(namaKamu))
Nama kamu : Iim Marlina
>>> print("Nama Kamu : "+str(namaKamu))
Nama Kamu : Iim Marlina
>>> 
```  
simple bukan bahasa python ini, setiap code (syntax) di tulis secara sederhana seperti itu :  
menggunakan function di interactive mode :  
```bash
root@codesyariah:/home/puji122# python
Python 3.7.3 (default, Sep  1 2020, 19:08:02) 
[GCC 6.3.0 20170516] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> def triangle():
...     x = int(input("input X : ? "))
...     y = int(input("input Y : ? "))
...     string = ""
...     
...     while x > 0:
...             y = x
...             
...             while y > 0:
...                     string = string + "*"
...                     y = y - 1
...             string = string + "\n"
...             x = x - 1
...     print(string)
... 
>>> triangle()
input X : ? 12
input Y : ? 12
************
***********
**********
*********
********
*******
******
*****
****
***
**
*

>>> 
```  
seru bukan belajar pemrograman menggunakan bahasa python, syntax nya ringkas. tidak bertele-tele. hehehe.  
untuk menggunakan python sendiri, kita bisa menggunakan ***code editor*** apapun, kalo gout seperti biasa masih pakai ```sublime text 3``` sebagai editor gout, maklumlah orang lama, gak kuat pakai ```VSCode```.  

#### Menggunakan code editor  
kita biasa siapkan dulu code editornya terlebih dahulu, gout pakai ***SublimeText3***. buat direktori baru untuk project belajar python kita : 
kemudian buka di code editor. 
untuk penamaan ekstension python menggunakan (.py) ```TestPython.py``` seperti itu. 

## ***program python pertama :***  

**Variable** :
```python
nama = "Puji Ermanto"
umur = 32
tinggi = 170.5

print(nama)

namaType = type(nama)

print(namaType)
```  
**Penulisan komentar di python :**
```python
# Komentar di python(single line)
""" 
Komentar multi line
yah gitu deh ini namanya komentar
"""

# Komentar single line
```  

**Contoh pengunaan modul di python :**  
```python
import time 
start_time = time.time()

print("Hello")
print("World")
print("Hello World")

print("Hallo Dunia")

a = 10


print(a)

print(time.time()-start_time, "detik")
```  

**Menjalankan metode / membuat metode sendiri:**  

```python
# nama file : lat1.py
def flat(bumi):
	flat = True
	if(bumi == flat):
		print("The earth is flat")
	else:
		print("Ok no problems!")

flat(True)
```  
```python
# nama file = lat2py
def pembuat_password(website, tahun):
	return website.lower() +', '+ str(tahun * 11)

websiteKu = pembuat_password('pujiermanto.netlify.app', 2020)

print(websiteKu)
```  
```python
# nama file = math.py
def pangkat_dua(angka):
	return angka ** 2

pangkat = pangkat_dua(5)
print(pangkat)
```  
```python
# nama file = perbandingan.py
print(11 == 1)

print("PujiErmanto" != "Erick")

print(5 >= 0)

print("HODOR" == "hodor")

print(100 == (10*10))
```
Dan seterusnya, sobat coders dapat mengulik nya sendiri, kunjungi documentasi python : 
<ul>
	<li>
		<a href="https://docs.python.org/3/">Documentation python3</a>
	</li>
	<li>
		<a href="https://www.w3schools.com/python/python_syntax.asp">Python in w3school</a>  
	</li>
</ul>


Ok sekian dulu artikel mengenai Python kali ini, inshaallah nanti gout sambung lagi membahas mengenai python, di artikel selanjut-lanjutnya.  

akhir kata gout ucapkan terima kasih, jangan lupa jaga selalu kesehatan kita. Salam sukses selalu. Aamiin. 

**Wassalam**


By. Puji Ermanto



