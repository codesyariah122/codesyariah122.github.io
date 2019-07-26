---
title: "Projects"
layout: default
permalink: "/projects-list.html"
---
<div class="container">
<h4 class="font-weight-bold spanborder"><span>{{page.title}}</span></h4>
{% assign project = site.data.projects[page.title] %}
    <div class="row gap-y listrecent listrecent listauthor">
    {% for project in site.data.projects %}
        <div class="col-lg-6 mb-4">
            <div class="p-4 border rounded">
            <div class="row">
            <div class="col-md-3 mb-4 mb-md-0">
<img alt="{{ project[1].title }}" src="{{site.url}}{{ project[1].img_path }}" class="img-thumbnail"></div>
            <div class="col-md-9">
            <a href="{{site.url}}/project-{{ project[1].project_name | slugify }}">
            <h4 class="text-dark mb-0"> {{ project[1].title }} </h4>
            <small class="d-inline-block mt-1 mb-3 font-weight-normal">(View Posts)</small>
            <div class="excerpt">
            {{ project[1].content }}</div>
            </a>
            <div class="icon-block mt-3 d-flex justify-content-between">  
            <div>
            <a target="_blank" href="{{ project[1].instagram }}"><i class="fa fa-instagram text-muted" aria-hidden="true"></i></a> &nbsp;
            <a target="_blank" href="{{ project[1].website }}"><i class="fa fa-globe text-muted" aria-hidden="true"></i></a> &nbsp;
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    {% endfor %}
    </div>
</div>
