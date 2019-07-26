---
title: "Projects"
layout: default
permalink: "/projects/"
---
{% for project in site.projects %}
{{ project.content }}
{% endfor %}
