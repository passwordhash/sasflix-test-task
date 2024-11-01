include .env
export

SASFLIX_PORT ?= 3030
NITRO_PORT ?= 3030

start: build run

build:
	docker build --build-arg NITRO_PORT=$(NITRO_PORT) -t docker/sasflix .

run:
	docker run -d --rm --env-file .env  -p=$(SASFLIX_PORT):$(NITRO_PORT) --name sasflix docker/sasflix
