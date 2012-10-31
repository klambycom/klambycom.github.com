---
layout: post
title: "Octopress på Github"
date: 2012-10-30 12:05
comments: true
categories: [Webbteknisk introduktion, Octopress, Github]
published: false
---

Lite text om Github pages, jekyll och octopress.


## Sätta upp bloggen

Du måste ha minst [Ruby](http://www.ruby-lang.org/en/) 1.9.2 för att kunna köra 
Octopress. Jag vet inte hur man gör på Windows, men i Mac OS X och Linux kan du 
köra:

    git clone git://github.com/imathis/octopress.git octopress
    cd octopress
    bundle install
    bundle exec rake install

Detta kommer klona Octopress från Github till mappen octopress, installera alla
gems som behövs och tillslut installera Octopress standardtema.

För att hosta bloggen på Github måste du skapa ett repository med namnet
`<användarnamn>.github.com`. Sen fixar `rake setup_github_pages` resten.

## Inställningar

Inställningarna finns i `_config.yml` och är ganska självförklarande.


## Första inlägget

    rake new_post["Hello world"]

Kommandot kommer skapa en ny fil i `source/_posts` med filnamnet
`ÅÅÅÅ-MM-DD-hello-world.markdown`, det är i denna filen du skrivet ditt
blogginlägg. Mer info om [Markdown](http://daringfireball.net/projects/markdown/basics)
och dess [syntax](http://daringfireball.net/projects/markdown/syntax).

Överst i filen hittar du 
[information om blogginlägget i YAML-format](https://github.com/mojombo/jekyll/wiki/yaml-front-matter). 
Ett tips är att lägga till `published: false` under tiden du skriver inlägget 
för att det inte ska synas, även om du pushar till Github.

När du har skrivit färdigt inlägget genererar du html-filerna i mappen
_deploy/, och pushar till master branchen.

    bundle exec rake generate
    bundle exec rake deploy

Pusha source/ till Github måste du göra manuellt.

    git add .
    git commit -am 'Hello world!'
    git push origin source

## Ändra utseendet

Man ändrar utseendet i `sass/custom/` men kom ihåg att lägga till filerna du 
har ändrat till `sass/screen.scss`.

Ändra CSS är enkelt, det är tyvärr inte HTML. Filerna finns utspridda lite
överallt i `source/`. Om du letar lite hittar du tillslut den filen du vill
ändra.

## Egen domän

För att koppla en egen domän till din blogg måste du skapa en fil med namnet
`CNAME` i `source/`.

    cd source
    echo 'klamby.com' >> CNAME
    bundle exec rake generate
    bundle exec rake deploy

Pusha sen `source/` till Github.

    git add .
    git commit -am 'Created a CNAME for Klamby.com'
    git push origin source
