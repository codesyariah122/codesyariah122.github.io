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

and this is in my layout post list on jekyll : 

```ruby
<div class="row justify-content-end">
	<div class="col-xs-12">
		
		
	<ul class="post-list"> 
	{% for post in paginator.posts %}   
		<li class="post">
		<h1 class="post-title" id="post-title" style="color:#e5e7e9;">
		  <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
		</h1>
				  <span class="post-meta post-date">{{ post.date | date: '%B %d, %Y'}}
				 <p> {{ post.content | strip_html | truncatewords: 50 }}</p>
				 {% if post_excerpt == post.description or excerpt_words != content_words %}
			<p class="more-link"> ... <a href="{{ post.url | prepend: site.baseurl }}">read more &raquo;</a></p>
		{% endif %}
	  </li>
	{% endfor %}
	</ul>
	
		  <div class="container">
			<div class="row justify-content-center">
			  <div class="col-xs-6">
				  <!-- pagination -->
				  <nav aria-label="Page navigation example">
					  <ul class="pagination pagination-sm">
							{% if paginator.previous_page %}
						<li class="page-item active">
						  <a class="page-link" href="{{ paginator.previous_page_path | prepend: site.baseurl | replace: '//', '/' }}"><i class="fas fa-fw fa-chevron-left"></i> Prev</a></li>
					  {% else %}
						<li class="page-item disabled"><a class="page-link"><i class="fas fa-fw fa-chevron-left"></i> Prev</a></li>
					  {% endif %}
	
	  <!--                 {% for page in (1..paginator.total_pages) %}
						{% if page == paginator.page %}
						  <li class="page-item disabled"><a class="page-link" href="{{page}}">{{ page }}</a></li>
						{% elsif page == 1 %}
						  <li class="page-item"><a class="page-link" href="/">{{ page }}</a></li>
						{% else %}
						  <li class="page-item"><a class="page-link" href="{{ site.paginate_path | prepend: site.baseurl | replace: '//', '/' | replace: ':num', page }}">{{ page }}</a></li>
						{% endif %}
					  {% endfor %} -->
	
					  {% if paginator.next_page %}
						<li class="page-item active"><a class="page-link" href="{{ paginator.next_page_path | prepend: site.baseurl | replace: '//', '/' }}">Next <i class="fas fa-chevron-right"></i></a></li>
					  {% else %}
						<li class="page-item disabled"><a class="page-link"> Next <i class="fas fa-chevron-right"></i></a></li>
					  {% endif %}
				  </ul>
				</nav>
			  </div>
			</div>
		  </div>
	
		</div>
	  </div>
```