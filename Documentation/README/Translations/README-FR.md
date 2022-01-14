

Bot présence
===

[![Generic badge](https://img.shields.io/badge/Download-BotPresence-<COLOR>.svg)](https://github.com/epfl-idevfsd/presence_bot/archive/refs/heads/main.zip) [![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/) [![Docker](https://badgen.net/badge/icon/docker?icon=docker&label)](https://https://docker.com/) 
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiphy.com%2Fexplore%2Ffull-stack-developer&psig=AOvVaw3MYRKF-svcGg5xgURph5S-&ust=1642254475891000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCthOmwsfUCFQAAAAAdAAAAABBZ)[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/epfl-idevfsd/presence_bot/graphs/contributors)

![](https://i.imgur.com/4u4tx9r.jpg)

## Traduction:
* [English](https://github.com/epfl-idevfsd/presence_bot#readme)

### Ce que fait l'application
C'est un bot telegram qui permet, à travers une interface graphique, d'indiquer si l'on travaille à domicile ou sur site.  

### Pourquoi nous avons utilisé les technologies que nous avons utilisées.
Nous avons utilisé pour cela telegraf une librairie qui nous permet de réaliser notre bot sur telegram, en JavaScript, avec un stockage des données sous forme de Json.

## Table des matières

- [Bot présence](#bot-pr-sence)
  * [Traduction:](#traduction-)
    + [Ce que fait l'application](#ce-que-fait-l-application)
    + [Pourquoi nous avons utilisé les technologies que nous avons utilisées.](#pourquoi-nous-avons-utilis--les-technologies-que-nous-avons-utilis-es)
  * [Table des matières](#table-des-mati-res)
  * [Comment installer et lancer le projet](#comment-installer-et-lancer-le-projet)
    + [MakeFile](#makefile)
  * [Comment utiliser le bot](#comment-utiliser-le-bot)
    + [Modifier la présence](#modifier-la-pr-sence)
    + [Exemple](#exemple)
  * [Faites-nous savoir !](#faites-nous-savoir--)


## Comment installer et lancer le projet
### MakeFile 

#### build:
> docker-compose build 

#### run:
> docker run -it botpresence bash

#### start:
> docker-compose up --build botpresence

#### stop:
> docker stop botpresence:latest

#### kill:
> docker kill $$(docker ps)


Comment utiliser le bot
---
### Modifier la présence

![](https://i.imgur.com/1uVwKPD.png)


---
### Exemple
#### 1. Choisissez la semaine en cours, vous pouvez utiliser les boutons précédent et suivant pour naviguer entre les mois.
![](https://i.imgur.com/QbFl9fA.png)
#### 2. Choisissez la semaine en cours et cliquez sur le bouton
![](https://i.imgur.com/X5M2H6T.png)
#### 3. Enfin, cliquez sur le bouton [AM] ou [PM]. Sachant que : 
 ❌ signifie non présent sur le site || ✅ signifie présent sur le site.  

## Faites-nous savoir !

**Vous trouvez ce document incomplet ?** Laissez un commentaire !

