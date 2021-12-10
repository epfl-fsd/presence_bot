FROM ubuntu:20.04

#Update ...
RUN apt-get update
RUN apt-get upgrade -y
#Install node Js
RUN apt install nodejs -y
#Intall npm
RUN apt install npm -y
#Create a folder and create directory  
RUN mkdir /botpresence 
WORKDIR  /botpresence
#Run the bot
CMD ["npm","run","dev"]

