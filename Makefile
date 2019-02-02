export APP

LERNA=node_modules/.bin/lerna

.PHONY:	target init ci-target lerna-clean lerna-bootstrap npm-ci

target:
ifneq ($(strip $(APP)),)
	$(LERNA) run build --scope=@etotama/$(APP)
else
	@echo "No APP given"
	exit 1
endif

lerna-clean:
	$(LERNA) clean -y

lerna-bootstrap:
	$(LERNA) link ;\
	$(LERNA) bootstrap --hoist

npm-ci:
	npm ci

ci-target: init target

init: npm-ci lerna-bootstrap
