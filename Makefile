export APP

LERNA=node_modules/.bin/lerna

.PHONY:	target target-all init ci-target lerna-clean lerna-bootstrap npm-ci tidy

# Make a build of the given target app
target:
ifneq ($(strip $(APP)),)
	$(LERNA) run build --scope=@etotama/$(APP)
else
	@echo "No APP given"
	exit 1
endif

target-all:
	$(LERNA) run build

lerna-clean:
	$(LERNA) clean -y

lerna-bootstrap:
	$(LERNA) link ;\
	$(LERNA) bootstrap --hoist

npm-ci:
	npm ci

ci-target: init target

tidy: lerna-clean lerna-bootstrap

init: npm-ci lerna-bootstrap
