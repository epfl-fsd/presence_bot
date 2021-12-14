build:
	docker-compose build 

run:
	docker run -it botpresence bash

start:
	docker-compose up --build botpresence

stop:
	docker stop botpresence:latest

kill:
	docker kill $$(docker ps)

