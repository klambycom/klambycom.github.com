---
layout: post
title:  "Kommentar på utvärdering"
date:   2015-01-18 00:09:09
comments: false
---

Dessa är mina kommentarer på [Sofia Hjelms djupdykning](http://scriptogr.am/moxs/post/djupdykning).

Jag kände inte till `React.addons.classSet`, men den är väldigt användbar och
jag hade kunnat använda den i min applikation. Jag har inte kollar på något
i `React.addons` mer än `TestUtils`, i min egna applikation.

[Envify](https://github.com/hughsk/envify) är säkert väldigt ifall man behöver
använda API-nycklar eller annat som man inte vill skriva direkt i koden, utan
istället spara i en environment-variabel. I en tidigare kurs använde jag ett
shell-script med raden
`sed "14s/'.*'/'$(echo $toerh_id)'/" -i app/assets/javascripts/config.js`
för att ändra API-nyckel, envify hade varit en mycket snyggare lösning.

[Momentjs](http://momentjs.com/) har jag nog använt i alla mina senaste
projekt. I denna kursen har jag använt det för att se om podcast-datan ska
hämtas på nytt, p.g.a. gammal data, och även för att kunna skriva ut datumen
i ett snyggare format. [Moment-range](https://github.com/gf3/moment-range) har
jag aldrig använt.

Det är helt klar väldigt nyttigt att läsa andras kod, jag borde göra det mer.
