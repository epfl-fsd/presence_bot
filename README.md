# Cahier des charges  
![](https://i.imgur.com/4u4tx9r.jpg)

## Contexte // Context

**[FR]** Personne ne veut se retrouver seul par surprise sur le site de l'EPFL. La plupart des apprentis sont confrontés à une perte de motivation lorsqu'ils sont dans cette situation. On peut pourtant préciser si on fait du télétravail dans absences.epfl.ch, seulement voilà : informer ces collègues de sa présence tous les jours peut être chronophage ou encore peu pratique pour certaines personne. 

---

**[EN]** No one wants to find themselves alone by surprise at the EPFL site. Most apprentices are faced with a lack of motivation when they are in this situation. However, it is possible to specify if you are teleworking in absences.epfl.ch, but here's the thing: informing your colleagues of your presence every day can be time-consuming or even impractical for some people. 
## Objectif // Goal

**[FR]** C'est la raison pour laquelle nous avons eu l'idée de ce bot. Le but étant de faciliter la communication des présences sur site des membres de ISAS-FSD.

---

**[EN]** This is why we came up with the idea of this bot. The aim is to facilitate the communication of ISAS-FSD members' on-site presence.


## KSP
**[FR]**
* Extrêmement rapide d’utilisation
* Ui minimaliste
* Utilisable n’importe quand et n’importe ou
 
---

**[EN]**
* Extremely fast to use
* Minimalist UI
* Can be used anytime and anywhere 

## Fiche signalétique // information sheet
**[FR]**
> Nombre d’utilisateur simultané : **1 personne**  
> Personne cible : **Membres ISAS-FSD**  
> Prix : **Gratuit**  
> Plateforme : **Telegram(app & browser)**  
> Language de programmation : **JavaScript**  
> Dépendance : **telegraf, nodeJs**
> Date limite : **21 Janvier 2022**  
---
**[EN]**
>Number of simultaneous users: **1 person** >  
> Target person: **ISAS-FSD members**   
Price: **Free**  
> Platform: **Telegram(app & browser)**  
> Programming language: **JavaScript**  
> Dependency: **telegraf, nodeJs**  
> Deadline: **21 January 2022**  
## Description fonctionnelle des besoins // Functional description of requirements
**[FR]**
#### Mettre à jour les informations du planning :
* Image
* Tableau à double entrée  
#### Afficher les boutons :
* Inline command
* Telegraf  
#### Utilisation des boutons :
* Inline command 
* Telegraf  
#### Telegraf :
* Afficher les boutons
* Utilsation des boutons
#### JSON :
* Insérer des données  
* Éxtraire des données 

---

**[EN]**
#### Update schedule information:
* Image
* Double entry table  
#### Show buttons :
* Inline command
* Telegraf  
#### Using the buttons:
* Inline command 
* Telegraf  
#### Telegraf:
* Displaying the buttons
* Use of buttons
#### JSON :
* Inserting data  
* Extracting data 
## Délais // Deadline
**[FR]** 21 janvier 2022

---

**[EN]** 21 January 2022  
# MakeFile 

## build:
> docker-compose build 

## run:
> docker run -it botpresence bash

## start:
> docker-compose up --build botpresence

## stop:
> docker stop botpresence:latest

## kill:
> docker kill $$(docker ps)
