

Presence bot
===

[![Generic badge](https://img.shields.io/badge/Download-BotPresence-<COLOR>.svg)](https://github.com/epfl-idevfsd/presence_bot/archive/refs/heads/main.zip) [![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/) [![Docker](https://badgen.net/badge/icon/docker?icon=docker&label)](https://https://docker.com/) 
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://www.google.com/url?sa=i&url=https%3A%2F%2Fgiphy.com%2Fexplore%2Ffull-stack-developer&psig=AOvVaw3MYRKF-svcGg5xgURph5S-&ust=1642254475891000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKCthOmwsfUCFQAAAAAdAAAAABBZ)[![ForTheBadge built-by-developers](http://ForTheBadge.com/images/badges/built-by-developers.svg)](https://github.com/epfl-idevfsd/presence_bot/graphs/contributors)


### What the application does
It's a telegram bot that allows, through a graphic interface, to indicate whether one is working from home or on site.  

### Why we used the technologies we used.
We have used for that telegraf a library which allows us to make our bot on telegram, in JavaScript, with a data storage in the form of a Json.

## Table of Contents

[TOC]

## How to Install and Run the Project
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


How to use the bot
---
### Toggle presence

```sequence
Note left of Alice: "I'm working from home today"
Alice->Telegram: Click on the current week button
Telegram->Bot: Send the choosen week
Bot-->Telegram: Send the selected week information
Telegram --> Alice: Display the week with date 
Alice->Telegram: Click on the current day button
Telegram->Bot: Send the choosen day
Bot-->Telegram: Send the selected day information (AM/PM)
Telegram --> Alice: Display the current day 
Alice->Telegram: Click on the current day AM button and the PM
Telegram->Bot: Store the information

```

---
### Exemple
#### 1. Choose the current week, you can use the previous and next button to navigate between the month.
![](https://i.imgur.com/QbFl9fA.png)
#### 2. Choose the current week and click on the button
![](https://i.imgur.com/X5M2H6T.png)
#### 3. finally click on the [AM] or [PM] button. Knowing that: 
 ❌ means not present on site || ✅ means present on site
![](https://i.imgur.com/4ndrmgN.png)

## Let us know !

:::info
**Find this document incomplete?** Leave a comment!
:::
