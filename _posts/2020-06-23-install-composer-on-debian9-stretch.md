---
layout: post
title:  "Install composer on debian 9 stretch"
author: puji
categories: [ PHP, Composer ]
image: assets/images/post/pagination.png
tags: [webdevelopment]
opening: بسم الله الرحمن الرحيم
---  
![composer]({{ site.url }}/assets/images/post/composer.png)  

# Prerequisites  

Before continuing with this tutorial, make sure you are logged in as a user with sudo privileges and you have PHP installed on your Debian 9 system.  

# Installing Composer  

Follow the steps below to install Composer on Debian systems:  

1. First update the packages index and install the necessary packages with the following commands:  

```
sudo apt update
sudo apt install php-cli php-zip wget unzip  
```  

2. Once the dependencies are installed, use the php cli toll to download the Composer installation script:  
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"  
```  
The command above will download the composer-setup.php file in the current working directory.  

3. We’ll verify the script data integrity by comparing the script SHA-384 hash with the latest installer hash found on the Composer Public Keys / Signatures page.

Run the following wget command to download the expected signature of the latest Composer installer from the Composer’s Github page and store it in a variable named HASH:  
```
HASH="$(wget -q -O - https://composer.github.io/installer.sig)"
```  
To verify that the installation script is not corrupted copy and paste the following code into your console:  
```
php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
```  
If the hashes match, you’ll see the following output:  
```
output : 
Installer verified
```  
If the hashes don’t match you will see Installer corrupt. In this case, you will need to redownload the Composer installation script and double check the value of the $HASH variable with echo $HASH. Once the installer is verified, you can continue with the next step.  

4. The following command will install Composer in the /usr/local/bin directory:  
```
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
```  
```
All settings correct for using Composer
Downloading...

Composer (version 1.8.5) successfully installed to: /usr/local/bin/composer
Use it: php /usr/local/bin/composer  
```  
At this point you have Composer installed on your Debian system. It is installed as a system-wide command and it will be available for all users.  
5. To verify the installation simply type:  
```
composer
```
The command above will print the Composer’s version, commands, and arguments. 
``` 
______
/ ____/___  ____ ___  ____  ____  ________  _____
/ /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.8.5 2019-04-09 17:46:47

Usage:
    command [options] [arguments]
```  

# Getting Started with Composer 
Create the project directory and switch to it with:  
```
mkdir ~/my-first-composer-project
cd ~/my-first-composer-project 
```  
Next, we’ll initialize a new composer.json file using the composer require <package name> command and specify the package we want to download. In this example, we will create a sample application that will print the current time using a package called carbon.

Run the following command to initialize a new composer.json file and install the carbon package:  
```
composer require nesbot/carbon
```
Composer will create a composer.json file and download and install carbon and all its dependencies.

If you list your project’s directory with the ls command, you will see that it contains two files composer.json and composer.lock, and a vendor directory.