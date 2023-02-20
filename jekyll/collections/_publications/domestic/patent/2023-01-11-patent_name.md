---
title: "patent name"
categories: domestic patent
status: "Applied"
research_info:
patent:
  applied:
    id: "patent id"
    date: "2023-01-11"
    firstfile:
    file: "/assets/files/publication/domestic/patent/patent.jpg"
  issued:
    id:
    date:
    firstfile:
    file:
  researchid:
  country: "대한민국"
authors:
  gildong Hong:

date: "2023-01-11"
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
