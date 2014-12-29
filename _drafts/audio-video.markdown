# Spela ljud i webbläsaren

Jag kommer i detta inlägget skriva om audio-elementet som finns i HTML5. Jag
kommer även skriva lite om video-elementet eftersom det fungerar väldigt mycket
som audio-elementet.


## &lt;audio&gt; och &lt;video&gt;

`<audio>` och `<video>` används för att spela ljud och video i webbläsaren,
utan att behöva använda plug-in som t.ex. Flash. Både `<audio>` och `<video>`
stödjs av alla moderna webbläsare, och ända tillbaka till Internet Explorer 9.


### Attribut

`<audio>` och `<video>` har några gemensamma attribut. Dessa kan även användas
i JS API:et som ...


#### src

Address till filen som ska spelas. Behövs inte anges, utan man kan istället
använda `<source>` innanför `<audio>` eller `<video>`.


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


#### mediagroup


#### loop


#### muted


#### controls


## Källor

* [http://caniuse.com/#feat=video](http://caniuse.com/#feat=video)
* [http://caniuse.com/#feat=audio](http://caniuse.com/#feat=audio)
* [http://www.w3.org/TR/html5/embedded-content-0.html](http://www.w3.org/TR/html5/embedded-content-0.html)



## Some useful links:
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
* http://www.w3schools.com/tags/ref_av_dom.asp
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
