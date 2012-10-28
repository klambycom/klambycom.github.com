---
layout: post
title: "CSS3 transforms"
date: 2012-10-25 12:40
comments: true
categories: [CSS3, transforms, Webbteknisk introduktion]
published: false
---

Transforms används för att med CSS omvandla element i tvådimensionell eller
tredimensionell rymd.

2D transforms fungerar i alla webbläsare utom Opera Mini, och IE 10, Firefox
och Opera kräver inte vendor prefix.

3D transforms fungerar i alla webbläsare utom IE, Opera och Opera Mini.
Internet Explorer kommer få stöd för det i IE 10. Alla webbläsare utom Firefox kräver
vendor prefix framför egenskapen.


## Rotera element

För att rotera ett element använder man `rotate`-egenskapen, och om man vill
ändra alla tre dimensioner kan man använda `rotate3d(x,y,z,angle)`.

För att kunna göra ett element 3D måste man sätta `perspective`, som avgör
intensiteten på 3D-effekten.

Det kan göras direkt med `transform`-egenskapen, om det bara ska göras på ett 
element.

    #box {
      background-color: red;
      width: 200px;
      height: 200px;
      -webkit-transform: perspective(600px) rotateY(45deg);
      -moz-transform: perspective(600px) rotateY(45deg);
      -o-transform: perspective(600px) rotateY(45deg);
      transform: perspective(600px) rotateY(45deg);
    }

När man har flera element som ska ändras måste man sätta
`perspective`-egenskapen på föräldern istället för att få förväntat resultat.

    #container {
      width: 200px;
      height: 200px;
    
      -webkit-perspective: 400px;
      -moz-perspective: 400px;
      -o-perspective: 400px;
      perspective: 400px;
    }
    
    #container .box {
      width: 55px;
      height: 55px;
      float: left;
      margin: 5px;
      background-color: green;
    
      -webkit-transform: rotateX(45deg);
      -moz-transform: rotateX(45deg);
      -o-transform: rotateX(45deg);
      transform: rotateX(45deg);
    }


## Flytta element

Flytta element är enkelt med `translate`. `translateX` flyttar ett element
horizontellt, `translateY` flyttar ett element vertikalt och `translateZ`
flyttar "fram" eller "tillbaka" ett element. Om man ska ändra alla tre
dimensioner kan man använda `translate3d(x,y,z,angle)`.

TODO Exempel


## Källor
* <http://24ways.org/2010/intro-to-css-3d-transforms>
* <http://caniuse.com/#feat=transforms3d>
* <http://www.w3.org/TR/css3-3d-transforms/>
* <http://docs.webplatform.org/wiki/css/transforms>
