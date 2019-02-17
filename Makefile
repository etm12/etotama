export APP

LERNA=node_modules/.bin/lerna
CODECOV=node_modules/.bin/codecov

log_success = (echo "\x1B[32m>> $1\x1B[39m")
log_error = (>&2 echo "\x1B[31m>> $1\x1B[39m" && exit 1)

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

## Derived "main level" targets

# Make a build of the given target app
.PHONY: target
target:
ifneq ($(strip $(APP)),)
	@scripts/get-version.js ci-target apps/$(APP)
	@$(call log_success, "Used generated env file")
	$(shell cat apps/$(APP)/.env)
	$(LERNA) run build --scope=@etotama/app.$(APP)
else
	@$(call log_error, "No \`APP\` given.")
	exit 1
endif

.PHONY: test
test:
	$(LERNA) run test:cov --scope=@etotama/core.*

.PHONY: codecov
codecov: test
	$(CODECOV)

.PHONY: ci-test
ci-test:
	$(LERNA) run ci:test:cov --scope=@etotama/core.*

# Build all targets
.PHONY: target-all
target-all:
	$(LERNA) run build

.PHONY: pixel
pixel:
	$(MAKE) target APP=pixel

# Build on CI
.PHONY: ci-target
ci-target: init target

# Perform housekeeping
.PHONY: tidy
tidy: lerna-clean lerna-bootstrap

# Perform required tasks for starting development
.PHONY: init
init: npm-ci lerna-bootstrap

