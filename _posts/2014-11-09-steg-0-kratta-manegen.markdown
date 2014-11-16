---
layout: post
title:  "Steg 0 - Kratta manegen"
date:   2014-11-09 22:59:16
comments: false
---

Jag lärde mig Javascript först i kursen Webbteknik I, innan dess hade jag bara
använt väldigt lite jQuery, men det har blivit mitt favoritspråk. Jag tror
därför att denna kursen kommer bli väldigt rolig och lärorik.

Jag har försökt skriva lite Javascript i alla kurser, och i kursen Individuellt
mjukvaruutvecklingsprojekt skapade jag webbplatsen/spelet [Skissa och
gissa](http://skissaochgissa.se) i Javascript och NodeJs.

[John Resigs interaktiva lektion](http://ejohn.org/apps/learn/) var väldigt
intressant, och perfekt för att fräsha upp kunskaperna. Jag tror jag kunde allt
sedan innan, men vissa saker hade jag glömt bort.

Jag hade till exempel glömt att man kan få reda på antalet argument till en
funktion med `length`. Det borde gå att använda för att göra currying möjligt
och frivilligt för alla funktioner.

{% highlight javascript %}
var add = enable_currying(function (a, b) {
  return a, b;
});

add(10, 5); //=> 15

var add10 = add(10);
add10(5); //=> 15
{% endhighlight %}

Jag brukar skapa en funktion med namnet `curry`:

{% highlight javascript %}
function add(a, b) {
  return a + b;
}

var add10 = curry(add, 10);
add10(5); //=> 15
{% endhighlight %}

Eller göra det manuellt:

{% highlight javascript %}
function add(a) {
  return function(b) {
    return a + b;
  }
}

var add10 = add(10);
add10(5); //=> 15
{% endhighlight %}


## Applikationen

<iframe src="/assets/podcast-prototyp/index.html" frameborder="0" width="400px" height="430px" style="float: left; margin: 0px 10px 5px 0px"></iframe>

Jag skulle gärna vilja göra en applikation för Firefox OS. Något jag har saknat
är en bra podcast-app, och jag tänkte att denna kursen kunde vara ett bra
tillfälle att börja på den. Men eftersom den måste fungera i fler webbläsare
blir det lite svårare.

Jag kan inte använda XMLHttpRequest för att hämta podcast-feeder från andra
webbplatser utan CORS. I Firefox OS hade jag kunnat använda SystemXHR, men jag
hittade Yahoos YQL som kan fungera som ett alternativ. YQL är ett SQL-liknande
API för att hämta och kombinera filer, och de stödjer CORS.

En viktig funktion i en podcast-app tycker jag är möjligheten att ladda ner
avsnitt för att kunna lyssna offline. I Firefox OS går det att spara på
mobilens SD-kortet. Jag hittade inget alternativ som fungerar i andra
webbläsare, så jag struntar i denna funktion.

För att se om applikationen ens går att skapa utan backend, har jag väldigt
snabbt skapat en prototyp, och den fungerar i senaste Chrome, Safari, Firefox
och borde fungera även i Internet Explorer.
