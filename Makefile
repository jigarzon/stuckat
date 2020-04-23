DIR=$(abspath $(dir $$PWD))

-include $(DIR)/config_deploy.env

RUNNER_IMAGE=$(DOCKER_REPO)/node-logger
RUNNER_IMAGE_VERSION=11-slim-0.0.8
APP_NAME=stuckat

# Here we obtain the version of the image from git tags. This is assumes the repo
# is using git flow. It takes into account everything (git tag, git hash commit,
# git branch in which we are standing)
ifeq ($(OVERRIDE_VERSION), )
    GIT_TAG=$(shell git describe --exact-match --tags 2> /dev/null)
    ifeq ($(GIT_TAG), )
        GIT_BRANCH_RAW=$(shell git branch | grep \*)
        ifeq ($(findstring no branch, $(GIT_BRANCH_RAW)), no branch)
            VERSION=unknown
        else
            GIT_BRANCH_ESCAPED=$(shell git branch | grep \* | cut -d ' ' -f2 | sed 's|/|-|g')
            VERSION=$(GIT_BRANCH_ESCAPED)
        endif
    else
        VERSION=$(GIT_TAG)
    endif
else
    VERSION=$(OVERRIDE_VERSION)
endif

define RUN_CONFIG
{
	"app_name": "$(APP_NAME)",
	"app_version": "$(VERSION)"
}
endef
export RUN_CONFIG

help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: publish-local-run-config ## Build the deployable image
	docker build --target "runner" -t $(APP_NAME) .

build-nc: gen-dockerfile publish-local-run-config  ## Build the container without caching
	docker build --target "runner" --no-cache -t $(APP_NAME) .

publish-local-run-config: ##Publishes the runConfig.json file on client (dev purposes)
	@echo "$$RUN_CONFIG" > $(DIR)/src-ssr/run_config.json

run-local: publish-local-run-config ## Run the local app in SSR mode (for dev purposes)
	@APP_CONFIG='$(shell cat $(DIR)/config_app.json)' \
	quasar dev -m ssr

run: ## Run container (for dev purposes)
	docker run -d --rm  \
		-p 8989:8989 \
		--env-file="$(DIR)/config_run.env" \
		--env APP_CONFIG='$(shell cat $(DIR)/config_app.json)' \
		--name="$(APP_NAME)" $(APP_NAME)

logs: ## Follow container logs for running local app (for dev purposes)
	docker logs -f $(APP_NAME)

connect: ## Connect a bash terminal to running container (for dev purposes)
	docker exec -it $(APP_NAME) /bin/bash

stop: ## Stop and remove a running container (for dev purposes)
	docker stop $(APP_NAME)
	docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

tag: tag-latest tag-version ## Generate container tags for the `{version}` ans `latest` tags

tag-latest: ## Generate container `latest` tag
	@echo 'create tag latest'
	docker tag $(APP_NAME) $(APP_NAME):latest

tag-version: ## Generate container `{version}` tag
	@echo 'create tag $(VERSION)'
	docker tag $(APP_NAME) $(APP_NAME):$(VERSION)

version: ## Output the current calculated version
	@echo $(VERSION)
