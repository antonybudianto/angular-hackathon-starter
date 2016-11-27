# Angular Hackathon Starter

[![Build Status](https://travis-ci.org/antonybudianto/angular-hackathon-starter.svg?branch=master)](https://travis-ci.org/antonybudianto/angular-hackathon-starter)
[![Build status](https://ci.appveyor.com/api/projects/status/d5b3a9nnxnv5bxa5/branch/master?svg=true)](https://ci.appveyor.com/project/antonybudianto/angular-hackathon-starter/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/antonybudianto/angular-hackathon-starter/badge.svg?branch=master)](https://coveralls.io/github/antonybudianto/angular-hackathon-starter?branch=master)
[![Dependency Status](https://david-dm.org/antonybudianto/angular-hackathon-starter.svg)](https://david-dm.org/antonybudianto/angular-hackathon-starter)
[![devDependency Status](https://david-dm.org/antonybudianto/angular-hackathon-starter/dev-status.svg)](https://david-dm.org/antonybudianto/angular-hackathon-starter#info=devDependencies)
[![Dependency Status](https://dependencyci.com/github/antonybudianto/angular-hackathon-starter/badge)](https://dependencyci.com/github/antonybudianto/angular-hackathon-starter)

> Live Production Build [Demo](http://angular-hackathon-starter.surge.sh/)

## Introduction
Welcome to Angular Hackathon Starter!
This starter is specially made for hackathon enthusiasts

> This repo is evolved from [Angular Webpack Starter](https://github.com/antonybudianto/angular-webpack-starter)


### What's included?
* [Angular](https://angular.io)
* [Firebase](https://firebase.google.com)

Please visit the [wiki](https://github.com/antonybudianto/angular-hackathon-starter/wiki) for more details.

## Prerequisites
You need to have [Node.js and npm](https://nodejs.org/en/)
- Support Node v4 - latest
- Support npm v3 - latest
- Support [Yarn](https://yarnpkg.com/)

## Installation
Download the starter from [releases page](https://github.com/antonybudianto/angular-hackathon-starter/releases)

Go to the starter directory and install the packages ([Yarn](https://github.com/yarnpkg/yarn) is recommended):
```bash
npm install
```

Then copy `.env.example` and rename it as `.env`. For more [details](https://github.com/antonybudianto/angular-hackathon-starter/wiki/Environment-Variables)

## Start
Let's start up, run following:
```bash
// Build DLL first, run this once after adding new package
npm run build:dll

// Start the app
npm start
```

and done! Open a browser and go to http://localhost:8080 and you can start developing Angular!
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

> If any error occured when starting, please retry `npm run build:dll`.
That means DLL build is too old and need to be refreshed.

## Testing
This starter comes with testing workflow

### Unit testing
Just run
```bash
npm test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled JavaScript coverage.

![Coverage result](http://s33.postimg.org/w7m9ckdkf/Screen_Shot_2016_06_04_at_8_15_53_AM.png)

### E2E testing
Firstly start the server:
```bash
npm start
```
To begin testing, run:
```bash
npm run e2e
```

## Production
> For more details, visit [Continuous Integration  wiki](https://github.com/antonybudianto/angular-hackathon-starter/wiki/Continuous-Integration)

You can create production build by running:
```bash
npm run build
```
or you can create production build and then serve it using Lite Server by running:
```bash
npm run serve:build
```

## Contributing
Feel free to submit a PR if there are any issues or new features, please read [this](https://github.com/antonybudianto/angular-hackathon-starter/wiki/Contributing) before

## License
MIT
