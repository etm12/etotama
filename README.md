
<center>
  <img src="https://raw.githubusercontent.com/etm12/etotama/master/assets/logo.png" alt="干支娘" />
</center>

---

## Contents

  - [Getting started](#getting-started)
    - [Running an application](#running-an-application)
  - [Modules](#modules)
    - [Apps](#apps)
    - [Libraries](#libraries)

## Getting started

This project uses [makefiles](./Makefile) for all project-related things; getting started, building, installing dependencies, etc.

```
git clone git@github.com:etm12/etotama.git
cd etotama
make init
```

### Running an application

```sh
lerna run start --scope=@etotama/app.APPNAME
```

## Modules

### Apps

  - [`@etotama/app.pixel`](./apps/pixel) — a web-based pixel editor

### Libraries

  - [`@etotama/core.shared`](./core/shared) — shared functions and utilities that are not specific to any one type of application
  - [`@etotama/core.typedefs`](./core/typedefs) — generic library-augmenting type declarations for TypeScript
  - [`@etotama/core.styles`](./core/styles) — base styles that can be used for all applications
