# Spela ljud i webbläsaren

Jag kommer i detta inlägget skriva om audio-elementet som finns i HTML5. Jag
kommer även skriva lite om video-elementet eftersom det fungerar väldigt mycket
som audio-elementet.


## &lt;audio&gt; och &lt;video&gt;

`<audio>` och `<video>` används för att spela ljud och video i webbläsaren,
utan att behöva använda plug-in som t.ex. Flash. Både `<audio>` och `<video>`
stödjs av alla moderna webbläsare, och ända tillbaka till Internet Explorer 9.

`<audio>` och `<video>` kan ha ett src-attribut eller en eller flera
`<source>`-elment.

{% highlight html %}
<audio src="fil.mp3" controls></audio>

<audio controls>
  <source src="fil.mp3" type="audio/mp3"></source>
  <source src="fil.wav" type="audio/wav"></source>
</audio>
{% endhighlight %}


### Attribut

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
audio.load(); // NEEDED???????
{% endhighlight %}


#### src

Address till filen som ska spelas. Behövs inte anges, utan man kan istället
använda `<source>` innanför `<audio>` eller `<video>`.

TODO Visa exempel!


#### crossorigin

Kan vara "anonymous" för att ..., "use-credentials" för att ... och om inget
anges är default-läget "No CORS".

Läs mer på http://www.w3.org/TR/html5/infrastructure.html#cors-settings-attribute.


#### preload

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


#### autoplay

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


#### mediagroup

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


#### loop

Boolean attributet `loop` startar om videon eller ljudet när det har spelats.


#### muted

Boolean attributet `muted` stänger av ljudet för vidoen eller ljudet.


#### controls

Om videon eller ljudet har boolean attributet `loop` kommer webbläsarens egna
controller visas. Det ser lite olika ut i olika webbläsare.

TODO Visa hur det ser ut i olika webbläsare.


### &lt;video&gt;-specifika attribut

`<video>` har ett par egna attribut.


#### poster

Bild som vissas innan videon är nerladdad och tillgänglig.


#### width och height

Används för att ändra storleket på videon.


### Egenskaper

Alla attribut går att använda som egenskaper i API:et, men det finns även
egenskaper som bara går att komma åt med API:et. Mycket är inte implementerat
i webbläsarna än, med dessa är de jag tycker är ANVÄNDBARAST.


#### buffered


#### currentTime

`currentTime` reprensenterar nuvarande position i sekunder. Kan även användas
för att ändra position.


#### duration

`duration` reprensenterar längden på videon eller ljudklippet. Om det inte
finns någon video eller ljud är `duration` NaN, och om det streamas är värdet
Inf (infinity).


#### networkState

`networkState` reprensenterar `<audio>`/`<video>` nuvarande tillstånd.

* 0 = NETWORK_EMPTY
* 1 = NETWORK_IDLE
* 2 = NETWORK_LOADING
* 3 = NETWORK_NO_SOURCE


#### playbackRate

`playbackRate` reprensenterar uppspelningshastigheten och kan även användas för
att ändra hastigheten. Kan även vara ett negativt värde för att spela
baklänges.


#### readyState

`readyState` reprensenterar hur mycket av filen som har laddats ner.

* 0 = HAVE_NOTHING
* 1 = HAVE_METADATA
* 2 = HAVE_CURRENT_DATA
* 3 = HAVE_FUTURE_DATA
* 4 = HAVE_ENOUGH_DATA


### Metoder


### Events


### OpenVTT


## Källor

* [http://caniuse.com/#feat=video](http://caniuse.com/#feat=video)
* [http://caniuse.com/#feat=audio](http://caniuse.com/#feat=audio)
* [http://www.w3.org/TR/html5/embedded-content-0.html](http://www.w3.org/TR/html5/embedded-content-0.html)
* [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
* [http://www.w3schools.com/tags/ref_av_dom.asp](http://www.w3schools.com/tags/ref_av_dom.asp)



## Some useful links:
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
* https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video

* http://www.html5rocks.com/en/tutorials/track/basics/

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
