---
title: "Projects"
layout: default
permalink: "/projects/"
data: nabilla bakery
---
{% assign project_data = site.data.projects[page.data] %}

<div class="container">
<h4 class="font-weight-bold spanborder"><span>{{page.title}}</span></h4>

    <div class="row gap-y listrecent listrecent listauthor">

    {% for data in site.projects %}

        <div class="col-lg-6 mb-4">
            <div class="p-4 border rounded">
            <div class="row">
            <div class="col-md-3 mb-4 mb-md-0">
            <img alt="{{ data.title }}" src="{{site.url}}{{ data.img_path }}" class="img-thumbnail">
            </div>
  
            <div class="col-md-9">
            <a href="{{site.url}}/project-{{ project_data.links | slugify }}">
            <h4 class="text-dark mb-0"> {{ project_data.title }}</h4>
            <small class="d-inline-block mt-1 mb-3 font-weight-normal">
                (View {{ project_data.name }})
            </small>
            </a>

            <blockquote style='color:lightskyblue;'>
              {{ project_data.tagline }}
            </blockquote>

            <div class="excerpt">
          
              {{project_data.content }}

            </div>
   
            <div class="icon-block mt-3 d-flex justify-content-between">  
            <div>
            <a target="_blank" href="{{ project_data.instagram }}"><i class="fab fa-instagram text-muted" aria-hidden="true"></i></a>  &nbsp;
            <a target="_blank" href="{{ project_data.website }}"><i class="fa fa-globe text-muted" aria-hidden="true"></i></a> &nbsp;
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    {% endfor %}
    </div>
</div>
