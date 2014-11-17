---
layout: post
title:  "Steg 1 - Hello World"
date:   2014-11-16 19:28:16
comments: true
---

## Byggprocess och dokumentation

Jag har tidigare använt Grunt för enklare saker som att slå ihop filer. Gulp har
fungerat lika bra och enda problemet jag har haft är att skapa filindex för Docco.
Eftersom `gulp.task('docs', ['builddocs', 'docsindex']);` kör builddocs och
docsindex samtidigt finns det inga filer att bygga ett index över, men man kan
ange att en task i Gulp ska vänta på en annan task:

{% highlight javascript %}
// return är viktigt för att det ska fungera
gulp.task('builddocs', function () {
  return gulp.src(['src/*/*.js', 'src/*.js'])
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

// docsindex väntar på att builddocs ska bli färdig
gulp.task('docsindex', ['builddocs'], function () {
  folderToc('docs', {
    name: 'index.html',
    layout: 'classic',
    filter: '*.html',
    title: 'Files'
  });
});
{% endhighlight %}

En annan sak jag upptäckte när jag jobbade med byggprocessen var att man kan
lägga till devDependencies och version till package.json med `npm install react
--save-dev` och dependencies med `npm install react --save`. Snabbare än att
ändra package.json manuellt.

Jag hade inga problem med att köra testen, lokalt eller på Travis. Jag har inte
läst något mer om hur man testar react-kod eller Jest, men jag har tänkt skriva
test till min kod. Jag brukar skriva ett par test och sen sluta för det tar för
lång tid.

Jag har en gulp-task som automatiskt kopierar index, js, bygger jsx och scss
när de filerna ändras. För att inte behöva ladda om sidan varje gång jag
ändrar något, använder jag
[Tincr](https://chrome.google.com/webstore/detail/tincr/lfjbhpnjiajjgnjganiaggebdhhpnbih),
som är ett tillägg till Chrome. Tincr fungerar  perfekt till css, som den
kan byta ut utan att ladda om sidan. När jag sparar scss-filerna så ser jag
förändringarna direkt i webbläsaren med bara ett par millisekunders fördröjning. 
Jag behöver inte skriva css direkt i webbläsaren längre.

Jag är antagligen inte färdig med byggprocessen, och jag gissar att jag kommer
behöver ändra den när jag har skrivit mer kod och vet vad jag behöver.

## JSHint

Jag har tidigare använt JSLint som plugin i vim, men det är oftast iriterande
eftersom felen oftare beror på att jag inte har skrivit färdigt koden än att
koden är dålig. Därför är det mycket bättre att Travis lintar koden, men jag
har även skapat en git-hook som körs innan koden pushas till Github.

{% highlight bash %}
#!/bin/sh

# .git/hooks/pre-push

while read oldrev newrev refname
do
  branch=$(git rev-parse --symbolic --abbrev-ref $refname)
  if [ "gh-pages" != "$branch" ]; then
    gulp lint
  fi
done
{% endhighlight %}

Onödigt kanske, men jag ville se hur git-hooks fungerar.


## Travis

Jag har valt att köra Travis på master-branchen istället för gh-pages, eftersom
jag tycker det är bättre att ha koden i master och genererade filer i gh-pages.
Jag har även tänkt att Travis ska generera filerna och sen pusha till gh-pages
varje gång kod pushas till master, men så långt har jag inte kommit än.


## Git

Jag har tänkt använda
[feature branches](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
vilket innebär att jag skapar en ny branch för varje feature eller bug, och
när jag är färdig och har fungerande kod mergar jag branchen med master. På så
sätt vet jag alltid att koden i master-branchen fungerar, vilket är
väldigt bra om jag ska använda Travis för att generera kod till gh-pages.

Men detta, plus att jag inte har all kod i gh-pages, kommer kanske göra det
svårare för de andra som läser kursen att bidra med kod. Så jag får kanske tänka
om.

Jag kommer skapa en milestone för varje vecka på Github och koppla issues till
den för att veta vad jag ska göra och se hur långt jag har kommit. Jag har även
skapat några labels till mina issues: bug, new feature, low priority, normal priority
och high priority.


## Länkar

* [Applikationen](http://klamby.com/Podcat/dist/)
* [Dokumentation](http://klamby.com/Podcat/docs/)
* [Koden på Github](https://github.com/klambycom/Podcat)
* [Nästa veckas milestone](https://github.com/klambycom/Podcat/milestones/Audio%20player)
