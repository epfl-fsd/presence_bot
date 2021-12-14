FROM ubuntu:20.04
RUN echo 91.189.88.152 archive.ubuntu.com >>/etc/hosts
ARG DEBIAN_FRONTEND=noninteractive 
RUN apt-get update -y

#IntallS npm and nodejs
RUN apt install -y curl 
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install -y nodejs 


#Create a folder and create directory  
RUN mkdir /botpresence 
WORKDIR /botpresence
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install 

#Run the bot
CMD ["npm","run","dev"]

#RUN apt-get update && apt-get install -y --no-install-recommends gnupg dirmngr && rm -rf /var/lib/apt/lists/* 