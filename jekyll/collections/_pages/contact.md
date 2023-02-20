---
title: Contact
permalink: /contact/
author_profile: true
authors: #Lab Manager information
  Gildong Hong:
    name     : "Gildong Hong"
    avatar   : "/assets/images/member/current/gildonghong.jpg"
    bio      : "Lab Manager"
    location : "Lab location"
    phone    : "+82-2-0000-1111"
    email    : "email-address"
---

## Contact us
I sincerely welcome you to visit the Big Data Science Laboratory.
If you are interested in applying to our laboratory or are interested in the ongoing research field and direction, please contact following emails.

<i class="fas fa-fw fa-envelope-square"></i> **Professor** \\
{{ "Professor's email-address" | protect_email: '' }}

<i class="fas fa-fw fa-envelope-square"></i> **Lab manager** \\
{{ "Lab-email-address" | protect_email: '' }}

## Address
<i class="fas fa-fw fa-map-marker-alt"></i> 서울특별시 서대문구 연세로 50 연세대학교 제4공학관 D808 데이터공학 연구실

<i class="fas fa-fw fa-map-marker-alt"></i> 03722, D808, 4th Engineering building, Department of Computer Science, Yonsei University, Yonsei-ro 50, Seodaemun-gu, Seoul, Republic of Korea

<div id="map" style="height:400px;"></div>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=9a79cf1a00554a3ee02d69c51b8f9988"></script>
<script>
var container = document.getElementById('map');
var options = {
  center: new daum.maps.LatLng(37.561894, 126.936157),
  level: 3,
};
var map = new daum.maps.Map(container, options);
var marker = new daum.maps.Marker({ position: map.getCenter() });
marker.setMap(map);
</script>

## Tel
<i class="fas fa-fw fa-phone"></i> **Laboratory** \\
+82-2-0000-1111
