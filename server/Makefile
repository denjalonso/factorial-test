.PHONY = default deps build test start-mooc-backend clean start-database start-backoffice-frontend

# Shell to use for running scripts
SHELL := $(shell which bash)
IMAGE_NAME := denjalonso/user-onboarding
SERVICE_NAME := app
PROFILE_APP_NAME := profile
# BACKOFFICE_APP_NAME := backoffice

# Test if the dependencies we need to run this Makefile are installed
DOCKER := $(shell command -v docker)
DOCKER_COMPOSE := $(shell command -v docker-compose)
deps:
ifndef DOCKER
	@echo "Docker is not available. Please install docker"
	@exit 1
endif
ifndef DOCKER_COMPOSE
	@echo "docker-compose is not available. Please install docker-compose"
	@exit 1
endif

default: build

# Build image
build:
	docker build -t $(IMAGE_NAME):dev .
