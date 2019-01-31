export APP

.PHONY:	target init

target:
	node_modules/.bin/lerna run build --scope=@etotama/$(APP)

init:
	npm ci ;\
	node_modules/.bin/lerna bootstrap
