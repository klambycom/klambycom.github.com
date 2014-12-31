---
layout: post
title:  "Spela ljud i webbläsaren"
date:   2014-12-31 23:59:59
comments: false
---

Jag kommer i detta inlägget skriva om audio-elementet som finns i HTML5. Jag
kommer även skriva lite om video-elementet eftersom de är så väldigt lika
varandra.


# &lt;audio&gt; och &lt;video&gt;

`<audio>` och `<video>` används för att spela ljud och video i webbläsaren,
utan att behöva använda plug-in som t.ex. Flash, och är en del av
[HTML5 Embedded content](http://www.w3.org/TR/html5/embedded-content-0.html).
Både `<audio>` och `<video>` stödjs av alla moderna webbläsare, och ända
tillbaka till Internet Explorer 9.

* [Caniuse &lt;video&gt;](http://caniuse.com/#feat=video)
* [Caniuse &lt;audio&gt;](http://caniuse.com/#feat=audio)

`<audio>` och `<video>` kan ha ett src-attribut eller en eller flera
`<source>`-element.

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
delar som ska spelas med hjälp av
[Media Fragments URI](http://www.w3.org/TR/media-frags/).

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

Kan vara "anonymous" eller "use-credentials" och om inget anges är default-läget
"No CORS". Läs mer hos
[W3C](http://www.w3.org/TR/html5/infrastructure.html#cors-settings-attribute).


### preload

`preload` används för att bestämma hur mycket som ska laddas ner innan
användaren börjar spela videon/ljudet, och även hur filen ska laddas ner.

Giltiga värden för `preload` är:

* `none` betyder att inget ska laddas ner innan användaren har klickat på
  play. Den bestämmer inte hur filen ska laddas ner när användaren har klickat
  på play.
* `metadata` betyder att metadata ska laddas ner, bl.a. längd. Oftast betyder
  det även att början av filen ska laddas ner. När användaren har klickat på
  play kommer filen laddas ner så långsamt som möjligt utan att behöva pausa
  för att buffra, för att spara bandbredd.
* `auto` innebär att både metadata och hela filen kan laddas ner direkt, utan
  att användaren ska behöva klicka på play.

Tom sträng är samma som `auto`, men om `preload` saknas rekomenderas `metadata`
i specifikationen. Chrome och Safari följer rekommendationen, men Firefox
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


### loop

Boolean attributet `loop` startar om videon eller ljudet när det har spelats.


### muted

Boolean attributet `muted` stänger av ljudet för vidoen eller ljudet.


### controls

Om videon eller ljudet har boolean attributet `loop` kommer webbläsarens egna
controller visas. Det ser lite olika ut i olika webbläsare.

<p style="text-align:center;"><img src="/assets/images/audio.png" /></p>


## &lt;video&gt;-specifika attribut

`<video>` har ett par egna attribut.

**poster** — Bild som vissas innan videon är nerladdad och tillgänglig.

**width och height** — Används för att ändra storleket på videon.


## Egenskaper

Alla attribut går att använda som egenskaper i API:et, men det finns även
egenskaper som bara går att komma åt med API:et. Mycket är inte implementerat
i webbläsarna än, med dessa är de jag tycker är viktigast.


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
Metoden `canPlayType()` kontrollerar om webbläsaren har stöd för ett visst
video-/ljud-format.

{% highlight javascript %}
var audio = new Audio();
audio.canPlayType('audio/mpeg;codecs="mp3"');
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

{% highlight javascript %}
var mp3s = [
  'http://sverigesradio.se/topsy/ljudfil/5182870.mp3',
  'http://sverigesradio.se/topsy/ljudfil/5180916.mp3',
  'http://sverigesradio.se/topsy/ljudfil/2103136.mp3',
  'http://sverigesradio.se/topsy/ljudfil/1642156.mp3',
  'http://sverigesradio.se/topsy/ljudfil/5149820.mp3'
];

var audio = new Audio();
audio.addEventListener('ended', function () {
  audio.src = mp3s.pop();
  audio.play();
});
{% endhighlight %}

`loadstart` när webbläsaren börjar ladda ner fil, `loadedmetadata` när metadata
är nerladdat och slutligen `loadeddata` när nuvarande del av filen är nerladdad.

`progress` när webbläsaren laddar ner filen.

{% highlight javascript %}
var audio = new Audio('http://...');
audio.addEventListener('progress', function () {
  var buffered = audio.buffered.end(audio.buffered.length - 1);
  console.log("Buffered: " + (buffered / audio.duration * 100) + "%");
});
{% endhighlight %}

`seeking` när användaren ändrar position i videon eller ljudet, och `seeked`
när användaren är färdig med att ändra position.

`timeupdate` när nuvarande position i videon eller ljudet ändras.

{% highlight javascript %}
var secsToStr = function (time) {
  if (isNaN(time)) { return '00:00'; }
  var hour = '';
  var min = Math.round(time / 60);
  var sec = Math.round(time % 60);

  if (min > 59) {
    hour = Math.round(min / 60) + ':';
    min = Math.round(min % 60);
  }

  return hour + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
};

var audio = new Audio('http://...');
audio.addEventListener('timeupdate', function () {
  console.log("Current time: " + secsToStr(audio.currentTime));
});
{% endhighlight %}

Andra event är `play`, `pause`, `durationchange`, `ratechange` (hastighet),
`volumechange` och `suspend` när webbläsaren har slutat hämta filen.


# &lt;track&gt;

[`<track>`](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#the-track-element)
används för att lägga till text till `<audio>` och `<video>` på angivna
ställen. Elementet har attributen:

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

Om du ska spela flera eller samma ljud samtidigt som du vill spela vid en exakt
tidpunkt, som i ett spel, fungerar `<audio>` inte lika bra, du kan istället
använda [Web Audio API](http://webaudio.github.io/web-audio-api/). Web Audio API
låter dig även använda effekter, generera, manipulera och analysera ljud.

Jag har tyvärr inte använt Web Audio API i min applikation, men jag tänkte
visa ett par exempel på vad man kan göra med det. Jag kommer inte gå igenom det
lika noga som jag gjorde med Audio-elementet. Jag rekommenderar att du läser HTML5Rocks
[introduktion till Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/).


## Spela ljud

Här använder jag AJAX, men du kan även använda Audio som källa till din
buffer, och då kan du streama ljudet istället för att ladda ner hela ljudet
innan du kan spela det.

{% highlight javascript %}
var context = new AudioContext();

var loadSound = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.addEventListener('load', function () {
    context.decodeAudioData(request.response, callback);
  });
  request.send();
};

var playSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};
{% endhighlight %}

[Demo](/demo/web_audio_api_play_sound/)

`decodeAudioData` avkodar ljuddatan i ArrayBuffer:en, och returnerar ett
Promise-objekt, men det går även att använda en success- och error-callback.
`createBufferSource` skapar en `AudioBufferSourceNode` och sen tilldelas den
buffer som ska spelas. AudioNode:en måste kopplas samman med en annan
AudioNode, i detta fallet `AudioDestinationNode` (högtalaren). Till sist spelar
ljudet från början.

## Generera ljud

Det går även att generera en buffer från kod och använda i en Node.

{% highlight javascript %}
var context = new AudioContext();

var whiteNoise = function () {
  var length = 2 * context.sampleRate;
  var buffer = context.createBuffer(1, length, context.sampleRate);
  var bufferData = buffer.getChannelData(0);

  for (var i = 0; i < length; i += 1) {
    bufferData[i] = (2 * Math.random() - 1);
  }

  return buffer;
};
{% endhighlight %}

[Demo](/demo/white_noise/)

`sampleRate` är antalet frames (?) per sekund, och därför är två ggr det
värdet två sekunder. Alla noder i samma context har samma hastighet. Sen skapas
en buffer och dess data hämtas med `getChannelData()` som
[PCM](http://en.wikipedia.org/wiki/Pulse-code_modulation) i en array.


## Manipulera ljud


## Analysera ljud

{% highlight javascript %}
var context = new AudioContext();

var audio = new Audio('http://...');
var source = context.createMediaElementSource(audio);

var analyser = context.createAnalyser();

source.connect(analyser);
analyser.connect(context.destination);
{% endhighlight %}

I exemplet ovan skapas en
[`AnalyserNode`](http://webaudio.github.io/web-audio-api/#the-analysernode-interface) 
mellan ljudet och högtalarna.





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
