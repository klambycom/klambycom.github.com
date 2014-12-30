---
layout: post
title:  "Spela ljud i webbläsaren"
date:   2014-12-31 23:59:59
comments: false
---

Jag kommer i detta inlägget skriva om audio-elementet som finns i HTML5. Jag
kommer även skriva lite om video-elementet eftersom det fungerar väldigt mycket
som audio-elementet.


# &lt;audio&gt; och &lt;video&gt;

`<audio>` och `<video>` används för att spela ljud och video i webbläsaren,
utan att behöva använda plug-in som t.ex. Flash. Både `<audio>` och `<video>`
stödjs av alla moderna webbläsare, och ända tillbaka till Internet Explorer 9.

`<audio>` och `<video>` kan ha ett src-attribut eller en eller flera
`<source>`-elment.

{% highlight html %}
<audio src="fil.mp3" controls></audio>

<audio controls>
  <source src="fil.mp3" type="audio/mpeg"></source>
  <source src="fil.wav" type="audio/wav"></source>
</audio>
{% endhighlight %}


## Attribut

`<audio>` och `<video>` har några gemensamma attribut. Dessa kan även användas
i JS API:et som egenskaper.

{% highlight html %}
<audio src="fil.mp3" autoplay></audio>
{% endhighlight %}

är samma som:

{% highlight javascript %}
var audio = new Audio();
audio.autoplay = true;
audio.src = "fil.mp3";
audio.load();
{% endhighlight %}


### src

Address till filen som ska spelas. Behövs inte anges, utan man kan istället
använda `<source>` innanför `<audio>` eller `<video>`. Det går att ange vilka
delar som ska spelas med hjälp av Media Fragments URI.

{% highlight html %}
<!-- Spela filen fil.mp3 -->
<audio src="fil.mp3"></audio>

<!-- Spela 10 sekunder från 20 sekunder in i filen -->
<audio src="fil.mp3#t=20,30"></audio>

<!-- Spela de första 30 minuterna -->
<audio src="fil.mp3#t=,00:30:00"></audio>

<!-- Börja spela en timme in i filen -->
<audio src="fil.mp3#t=01:00:00"></audio>
{% endhighlight %}

TODO Testa webbläsarsupport!

Det går att ange flera `<source>`, och då kommer webbläsaren välja den första
som den klarar av att spelar. Om webbläsaren inte kan spela någon av dem kommer
det som inte är `<source>` eller `<track>` visas.

{% highlight html %}
<audio controls>
  <source src="fil.mp3" type="video/mpeg">
  <source src="fil.wav" type="video/wav">
  <p>Din webbläsare kan inte spela filen.</p>
</audio>
{% endhighlight %}


### crossorigin

Kan vara "anonymous" för att ..., "use-credentials" för att ... och om inget
anges är default-läget "No CORS".

Läs mer på http://www.w3.org/TR/html5/infrastructure.html#cors-settings-attribute.


### preload

`preload` används för att bestämma hur mycket som ska laddas ner innan
användaren börjar spela videon/ljudet, och även hur filen ska laddas ner.

Giltiga värden för `preload` är:

* `none` betyder att inget ska laddas ner förren användaren har klickat på
  play. Den bestämmer inte hur filen ska laddas ner när användaren har klickat
  på play.
* `metadata` betyder att metadata ska laddas ner, t.ex. längd. Oftast betyder
  det även att början av filen ska laddas ner. När användaren har klickat på
  play kommer filen laddas ner så långsamt som möjligt utan att behöva pausa
  för att buffra, för att spara bandbredd.
* `auto` innebär att både metadata och hela filen kan laddas ner direkt, utan
  att användaren ska behöva klicka på play.

Tom sträng är samma som `auto`, men om `preload` saknas rekomenderas `metadata`
i specifikationen. Chrome och Safari följer specifikationen, men Firefox
använder `auto`.


### autoplay

`autoplay` är ett boolean attribut som används för att bestämma om spelaren
automatiskt ska börja spela.

{% highlight html %}
<!-- Spela automatiskt -->
<audio src="fil.mp3" autoplay></audio>
<audio src="fil.mp3" autoplay=autoplay></audio>
<audio src="fil.mp3" autoplay=""></audio>

<!-- Spela INTE automatiskt -->
<audio src="fil.mp3"></audio>
{% endhighlight %}


### mediagroup

`mediagroup` används för att gruppera flera `<audio>` och `<video>` för att
kunna styra med en gemensam MediaController.

{% highlight javascript %}
var a1 = new Audio('http://traffic.libsyn.com/kodsnack/James_Mickens.mp3');
var a2 = new Audio('http://traffic.libsyn.com/kodsnack/7_december.mp3');
a1.mediaGroup = 'group1';
a2.mediaGroup = 'group1';
a1.controller.play();
{% endhighlight %}

Men tyvärr stödjer ingen webbläsare MediaController.


### loop

Boolean attributet `loop` startar om videon eller ljudet när det har spelats.


### muted

Boolean attributet `muted` stänger av ljudet för vidoen eller ljudet.


### controls

Om videon eller ljudet har boolean attributet `loop` kommer webbläsarens egna
controller visas. Det ser lite olika ut i olika webbläsare.

TODO Visa hur det ser ut i olika webbläsare.


## &lt;video&gt;-specifika attribut

`<video>` har ett par egna attribut.

**poster** — Bild som vissas innan videon är nerladdad och tillgänglig.

**width och height** — Används för att ändra storleket på videon.


## Egenskaper

Alla attribut går att använda som egenskaper i API:et, men det finns även
egenskaper som bara går att komma åt med API:et. Mycket är inte implementerat
i webbläsarna än, med dessa är de jag tycker är ANVÄNDBARAST.


### buffered


### currentTime

`currentTime` reprensenterar nuvarande position i sekunder. Kan även användas
för att ändra position.


### duration

`duration` reprensenterar längden på videon eller ljudklippet. Om det inte
finns någon video eller ljud är `duration` NaN, och om det streamas är värdet
Inf (infinity).


### networkState

`networkState` reprensenterar `<audio>`/`<video>` nuvarande tillstånd.

* 0 = NETWORK_EMPTY
* 1 = NETWORK_IDLE
* 2 = NETWORK_LOADING
* 3 = NETWORK_NO_SOURCE


### playbackRate

`playbackRate` reprensenterar uppspelningshastigheten och kan även användas för
att ändra hastigheten. Kan även vara ett negativt värde för att spela
baklänges.


### readyState

`readyState` reprensenterar hur mycket av filen som har laddats ner.

* 0 = HAVE_NOTHING
* 1 = HAVE_METADATA
* 2 = HAVE_CURRENT_DATA
* 3 = HAVE_FUTURE_DATA
* 4 = HAVE_ENOUGH_DATA


### volume

`volume` reprensenterar volymen, och är ett värde mellan 0.0 och 1.0. Kan även
användas för att ändra volymen.


### buffered, played och seekable

`buffered` reprensenterar vilka delar av filen som har laddats, `played` vilka
delar av filen som har spelats av användaren och `seekable` vilka delar av filen
som är tillgängliga (oftast hela filen om den inte streamas). `buffered`, `played`
och `seekable` returnerar alla tre ett `TimeRanges`-objekt.

`TimeRanges` är ett objekt som har en egenskap och två funktioner:

* `length` är antalet tids-intervall.
* `start(index)` är hur många sekunder in i filen intervallet börjar.
* `end(index)` är hur många sekunder in i filen intervallet slutar.

Intervallen sorteras efter tid, och intervallet överlappas aldrig och börjar
aldrig där ett annat intervall slutar, intervallet slås istället ihop till ett
enda intervall.


## Metoder

`<audio>` och `<video>` har bara ett fåtal metoder och de är ganska
självförklarande, `play()`, `pause()` och `load()` (laddar om filen).
Metoden `canPlayType()` kontrollerar om webbläsaren har stöd för en viss
video-/ljus-format.

{% highlight javascript %}
var audio = new Audio();
audio.canPlayType('audio/mpeg';codecs="mp3"');
{% endhighlight %}

`canPlayType()` returnerar en tom sträng om webbläsaren inte kan spela formatet,
"probably" om webbläsaren vet att den kan spela formatet, annars returneras
"maybe".


## Events

`abort` när webbläsaren avbryter hämtandet av filen innan den är helt
nerladdad, men inte pga error. Då är det istället `error`-eventet eller
`stalled` när webbläsaren försöker hämta filen, men inte lyckas.

`canplay` när webbläsaren kan börja spela videon/ljudet och `canplaythrough`
när webbläsaren kan spela utan att behöva stanna för att buffra. När
webbläsaren behöver vänta på att filen buffras används eventet `waiting` och 
`playing` när filen börjar spelas igen (och även när filen börjar spelas igen
efter att ha varit pausad).

`ended` när videon eller ljudet är slut.

TODO Visa kodexempel där nästa avsnitt spelas när ended-eventet händer.

`loadstart` när webbläsaren börjar ladda ner fil, `loadedmetadata` när metadata
är nerladdat och slutligen `loadeddata` när nuvarande del av filen är nerladdad.

`progress` när webbläsaren laddar ner filen.

TODO Visa kodexempel där antalet nerladdat procent räknas ut.

`seeking` när användaren ändrar position i videon eller ljudet, och `seeked`
när användaren är färdig med att ändra position.

`timeupdate` när nuvarande position i videon eller ljudet ändras.

TODO Visa kodexempel med hur lång tid som har spelats.

Andra event är `play`, `pause`, `durationchange`, `ratechange` (hastighet),
`volumechange` och `suspend` när webbläsaren har slutat hämta filen.


# &lt;track&gt;

`<track>` används för att lägga till text till `<audio>` och `<video>` på
angivna ställen. Elementet har attributen:

* `kind` anger vilken typ av text-track.
  * "subtitles" — Transkription eller översättning av dialog.
  * "captions" — Transkription eller översättning av dialog, ljudeffekter och
    andra relevanta ljud. Användbart för när det är svårt att höra ljudet.
  * "descriptions"
  * "chapters"
  * "metadata" — Visas inte av webbläsaren.
* `src`
* `srclang` är textens språk.
* `label` är titel som används när webbläsaren listar tracks.
* `default` är ett boolean attribute.

{% highlight html %}
<video src="film.mp4">
  <track kind="subtitles" src="film.en.vtt" label="EN">
  <track kind="subtitles" src="film.sv.vtt" label="SV">
</video>
{% endhighlight %}


## WebVTT

WebVTT är ett format för att skapa tidsinställda textspår som fungerar
tillsammans med `<track>`. En WebVTT-fil måset vara UTF-8.

{% highlight text %}
WEBVTT

  1
  00:02:32.893 --> 00:02:36.328
  Fel, gör det igen!

  2
  00:02:37.123 --> 00:02:42.324
  Om du inte äter ditt kött, kan du inte ha någon pudding.
  Hur kan du ha någon pudding om du inte äter ditt kött?

  3
  00:02:42.343 --> 00:02:44.738
  Du! Ja, du bakom cyckelskjulet, stå stilla kompis!
{% endhighlight %}

Det finns mycket mer man kan göra. Mozilla Developer Network har mer
[information](https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format).
Och även [HTML5Rocks](http://www.html5rocks.com/en/tutorials/track/basics/).


# Web Audio API


# Källor

## `<audio>` och `<video>`

* [http://caniuse.com/#feat=video](http://caniuse.com/#feat=video)
* [http://caniuse.com/#feat=audio](http://caniuse.com/#feat=audio)
* [http://www.w3.org/TR/html5/embedded-content-0.html](http://www.w3.org/TR/html5/embedded-content-0.html)
* [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
* [http://www.w3schools.com/tags/ref_av_dom.asp](http://www.w3schools.com/tags/ref_av_dom.asp)
* [http://www.w3.org/TR/media-frags/](http://www.w3.org/TR/media-frags/)
* []()


## `<track>`

* [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
* [https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format](https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format)



## Some useful links:
* http://updates.html5rocks.com/2012/02/HTML5-audio-and-the-Web-Audio-API-are-BFFs
* https://developer.mozilla.org/en-US/docs/Creating_a_simple_synth

## Kanske Web Audio API:
* https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
* https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
* https://developer.mozilla.org/en-US/docs/Web/API/AudioNode

## Libs:
* http://popcornjs.org/
* http://mediaelementjs.com/
* http://www.jplayer.org/
