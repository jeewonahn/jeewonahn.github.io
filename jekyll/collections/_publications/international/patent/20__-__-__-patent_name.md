---
title: "patent title"
categories: international patent
status: "Issued"
research_info:
patent:
  applied:
    id: "patent id"
    date: "20**-**-**"
    firstfile:
    file:
  issued:
    id: "patent id"
    date: "20**-**-**"
    firstfile:
    file: "/assets/files/publication/international/patent/patent.pdf"
  researchid: 
  country: "country"
authors:
  gildong Hong:
  
date: "20**-**-**"
---
## Applicants
{% include authors_label authors=page.authors categories=page.categories %}

{% if page.patent.country %}
## Country
{{ page.patent.country }}
{% endif %}
## Applied
### ID
{{ page.patent.applied.id }}
### date
{{ page.patent.applied.date | date: '%B %e, %Y'}}
{% if page.patent.issued.date %}
## Issued
### ID
{{ page.patent.issued.id }}
### date
{{ page.patent.issued.date | date: '%B %e, %Y'}}
{% endif %}
## Status
{{ page.status }}

{% if page.research_info %}
## Research
{{ page.research_info }}
{% endif %}
