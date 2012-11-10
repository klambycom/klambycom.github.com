---
layout: post
title: "Bildspel skrivet i CSS"
date: 2012-11-10 00:57
comments: true
categories: [Webbteknisk introduktion]
css: slideshow
---

Jag hade en väldigt produktiv kväll igår. Jag lärde mig mycket mer om CSS3 
animation, keyframes, Sass och Compass, när jag gjorde ett bildspel i bara CSS.
Det blev även mitt första Ruby gem, [CSS3Slideshow](https://rubygems.org/gems/css3slideshow).
[Koden finns på Github](https://github.com/klambycom/css3-slideshow).

<div id="content-slider">
 <div id="slider">
  <div id="mask">
   <ul><li class="slide-img"> <a href="#"><img src="/images/slide-1.jpg" alt="Traktor"></a></li></ul>
   <ul><li class="slide-img"><a href="#"><img src="/images/slide-2.jpg" alt="Dator"></a></li></ul>
   <ul><li class="slide-img"><a href="#"><img src="/images/slide-3.jpg" alt="Musik"></a></li></ul>
  </div>
  <div class="progress-bar"></div>
 </div>
</div>


## Såhär använder du bildspelet

CSS3Slideshow använder Sass 3.2, Compass 0.12 och Animation 0.1. Först måste du 
installera CSS3Slideshow, `gem install css3slideshow`. Och lägga till `require
'css3slideshow'` i din ruby-fil, config.rb om sidan är genererad av Compass.

Din HTML bör se ut ungeför såhär:

    <div id="content-slider">
      <div id="slider">
        <div id="mask">
    
          <ul>
            <li class="slide-img">
              <a href="#"><img src="images/2.jpg" alt="Traktor"></a>
            </li>
          </ul>
    
          <ul>
            <li class="slide-img">
              <a href="#"><img src="images/3.jpg" alt="Dator"></a>
            </li>
          </ul>
    
          <ul>
            <li class="slide-img">
              <a href="#"><img src="images/8.jpg" alt="Musik"></a>
            </li>
          </ul>
    
        </div>
        <div class="progress-bar"></div>
      </div>
    </div>

Id och class går att ändra med:

*   `$slide_slideshow: "#content-slider";`
*   `$slide_slider: "#slider";`
*   `$slide_mask: "#mask";`
*   `$slide_progress_bar: ".progress-bar";`

Sass-filen bör innehålla minst:

    $slide_nr_of_images: 3;
    $slide_img_width: 680px;
    $slide_img_height: 320px;
    
    @import "css3slideshow";

Om det inte fungerar får du gärna skicka ett epost eller skriva till mig på
Twitter. Som sagt det är mitt första gem, jag kan ha gjort fel.
