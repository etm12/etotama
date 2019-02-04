export APP

LERNA=node_modules/.bin/lerna
VSCODE_DIR=.vscode

# Make a build of the given target app
.PHONY: target
target:
ifneq ($(strip $(APP)),)
	$(LERNA) run build --scope=@etotama/$(APP)
else
	@echo "No APP given"
	exit 1
endif

.PHONY: target-all
target-all:
	$(LERNA) run build

.PHONY: lerna-clean
lerna-clean:
	$(LERNA) clean -y

.PHONY: lerna-bootstrap
lerna-bootstrap:
	$(LERNA) bootstrap ;\
	$(LERNA) link

.PHONY: npm-ci
npm-ci:
	npm ci

# Bump project version number
.PHONY: version
version:
	$(LERNA) version \
		--conventional-commits \
		--exact \
		-m "chore(release): publish %s"

# Initialize VS Code workspace by installing recommended extensions
.PHONY: $(EXTS)
EXTS = $(shell jq '.recommendations[]' $(VSCODE_DIR)/extensions.json)

# Install VS Code extensions
.PHONY: install-vscode-extensions $(EXTS)
install-vscode-extensions: $(EXTS)
	$(shell code --install-extension $<)

# Build on CI
.PHONY: ci-target
ci-target: init target

# Perform housekeeping
.PHONY: tidy
tidy: lerna-clean lerna-bootstrap

# Perform required tasks for starting development
.PHONY: init
init: npm-ci lerna-bootstrap

