---
layout: post
title:  "Gulp, Travis CI och gh-pages"
date:   2014-11-23 19:51:16
comments: true
---

I kursen använder vi Travis CI för att köra våra test och vi använder gh-pages
på Github för våra applikationer. Jag ville därför att Travis CI skulle
publisera på gh-pages automatisk om testen lyckas och är gröna.

## Gulp

Eftersom vi använder gulp, använder jag gulp-gh-pages för att pusha den
genererade koden till gh-pages:

```
npm install gulp-gh-pages --save-dev
```

{% highlight javascript %}
var deploy = require('gulp-gh-pages');

gulp.task('deploy', ['deploy:dist', 'deploy:docs'], function () {
  return gulp.src('.tmp/**/*.*')
    .pipe(deploy());
});
{% endhighlight %}

`deploy:dist` och `deploy:docs` genererar kod och dokumentation och lägger det
i mappen `.tmp/`.


## Travis CI

För att Travis ska ha tillåtelse att pusha till Github, måste namn, epost och
token sparas för att senare användas för att sätta upp git hos Travis. För att
inte behöva spara detta publikt i .travis.yml, har Travis skapat ett Ruby-gem som
krypterar datan.

```
gem install travis
```

```
travis encrypt 'GIT_NAME="Ditt namn" GIT_EMAIL=foo@bar.com GH_TOKEN=token' --add
```

Du skapar din token på [Github.com → settings → applications](https://github.com/settings/applications).
Med `--add` läggs den enctryptade strängen automatiskt till i .travis.yaml. Travis
använder den för att skapa environment variabler, som du kan använda för att sätta
upp git.

{% highlight yaml %}
env:
  global:
    secure: hemligt
before_script:
  - git config --global user.email "$GIT_EMAIL"
  - git config --global user.name "$GIT_NAME"
after_success:
  - gulp deploy
{% endhighlight %}

Du måste även ändra i `gulpfile.js` så att `gulp deploy` vet vilken remote den
ska pusha till.

{% highlight javascript %}
return gulp.src('.tmp/**/*.*')
  .pipe(deploy({
    remoteUrl: 'https://' + process.env.GH_TOKEN + '@github.com/anvnamn/repo.git'
  }));
{% endhighlight %}


## Länkar

Det tog ett tag att få det att fungera, och dessa texter var till stor hjälp,
även om de har valt att lösa det lite anorlunda jämfört med hur jag har löst det.

* [https://gist.github.com/douglasduteil/5525750](https://gist.github.com/douglasduteil/5525750)
* [https://evansosenko.com/posts/automatic-publishing-github-pages-travis-ci/](https://evansosenko.com/posts/automatic-publishing-github-pages-travis-ci/)
* [http://begriffs.com/posts/2014-08-12-create-static-site-with-hakyll-github.html](http://begriffs.com/posts/2014-08-12-create-static-site-with-hakyll-github.html)
