---
layout: post
title:  "Create pagination on jekyll posts list and post single page"
author: puji
categories: [ Jekyll, ruby ]
image: assets/images/post/jekyll_pagination.png
tags: [jekyll]
opening: بسم الله الرحمن الرحيم
---  
open _config.yml file on root directori :  
adding new plugin config.
{% highlight ruby %}
plugins:
  - jekyll-paginate
{% endhighlight %}  
at same file on _config.yml, adding pagginate configuration :  
{% highlight ruby %}
paginate: 6
paginate_path: /page:num/
{% endhighlight %}  
open gemfile on the root directori :  
{% highlight ruby %}
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
  gem "jekyll-paginate"
  gem "jekyll-coffeescript"
  gem 'jekyll-sass-converter'
end
{% endhighlight %}  
and than open new terminal, and installing plugin :  
```
gem install jekyll-paginate
```  

### create paginate post list with css class bootstrap v-4.3
<h1 class="text-danger"><a href="https://github.com/codesyariah122/pujiermanto.github.io/blob/master/index.html">pagination</a></h1>