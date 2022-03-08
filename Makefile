dev:
	docker-compose --file docker-compose-dev.yml up --build

build:
	docker-compose build 

run:
	docker run -it botpresence bash

start:
	docker-compose --file docker-compose-prod.yml up --build

stop:
	docker stop botpresence:latest

kill:
	docker kill $$(docker ps)

