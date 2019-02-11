export APP

LERNA=node_modules/.bin/lerna
VSCODE_DIR=.vscode

## Project

## Managing project

# Project install (CI)
.PHONY: npm-ci
npm-ci:
	npm ci

# Project cleanup
.PHONY: lerna-clean
lerna-clean:
	$(LERNA) clean -y

# Project setup
.PHONY: lerna-bootstrap
lerna-bootstrap:
	$(LERNA) bootstrap ;\
	$(LERNA) link

# Bump project version number
.PHONY: version
version:
	$(LERNA) version \
		--conventional-commits \
		--exact \
		-m "chore(release): publish %s"

## Working on project

# Initialize VS Code workspace by installing recommended extensions
.PHONY: $(EXTS)
EXTS = $(shell jq '.recommendations[]' $(VSCODE_DIR)/extensions.json)

# Install VS Code extensions
.PHONY: install-vscode-extensions $(EXTS)
install-vscode-extensions: $(EXTS)
	$(shell code --install-extension $<)

## Derived "main level" targets

# Make a build of the given target app
.PHONY: target
target:
ifneq ($(strip $(APP)),)
	@scripts/get-version.js ci-target apps/$(APP)
	@echo "Used generated env file" ;\
	$(shell cat apps/$(APP)/.env)
	$(LERNA) run build --scope=@etotama/app.$(APP)
else
	@echo "No APP given"
	exit 1
endif

# Build all targets
.PHONY: target-all
target-all:
	$(LERNA) run build

# Build on CI
.PHONY: ci-target
ci-target: init target

# Perform housekeeping
.PHONY: tidy
tidy: lerna-clean lerna-bootstrap

# Perform required tasks for starting development
.PHONY: init
init: npm-ci lerna-bootstrap

