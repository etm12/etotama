
<center>
  <img src="https://raw.githubusercontent.com/etm12/etotama/master/assets/logo.png" alt="干支娘" />
</center>

---

## Contents

  - [Getting started](#getting-started)
    - [Requirements](#requirements)
    - [Running an application](#running-an-application)
  - [Modules](#modules)
    - [Apps](#apps)
    - [Libraries](#libraries)

## Getting started

### Requirements

Since this project is done in JavaScript, [Node.js][prog-nodejs] is the only _hard dependency_. Everything else can be done without installing additional software, but _strongly recommended_ installing for convenience.

Additional installs recommended:

  - [NVM - the Node.js version manager][prog-nvm]
  - [direnv][prog-direnv]

### Developing

In the repository root, first run the following:

```sh
nvm use
npm install
npm run bootstrap
```

This should set up the base Node.js environment (`nvm use`), install the base requirements for the project (`npm install`),
and then finally bootstrap the entire rest of the project (`npm run bootstrap`)

If you find yourself needing to do a cleanup from all installed dependencies or need to reset the environment to a clean state,
run `npm run clean` in the repository root.

### Running an application

```sh
lerna run start --scope=@etotama/app.APPNAME
```

## Modules

### Apps

  - [`@etotama/app.pixel`][app.pixel] — a web-based pixel editor

### Libraries

  - [`@etotama/core.cli][core.cli] — CLI utility for managing common project lifecycle-related things
  - [`@etotama/core.shared`][core.shared] — shared functions and utilities that are not specific to any one type of application
  - [`@etotama/core.styles`][core.styles] — base styles that can be used for all applications
  - [`@etotama/core.typedefs`][core.typedefs] — generic library-augmenting type declarations for TypeScript

[app.pixel]: ./apps/pixel

[core.cli]: ./core/cli
[core.shared]: ./core/shared
[core.styles]: ./core/styles
[core.typedefs]: ./core/typedefs

[prog-nodejs]: https://nodejs.org/en/
[prog-nvm]: https://github.com/creationix/nvm
[prog-direnv]: https://direnv.net/
