# Basics
- To find npm version `npm -v`
- To set up node applicatino `npm init` or `npm init --yes`
- To install a node package `npm i packageName` or `npm i -g packageName` for global
- To import or use a pakcage `const package = require('packageName')`
- To install frmo package.json `npm i`

## Semantic Versionnig (SemVer)
- Package version - `major.minor.patch`
- `^` => As long as same major version is retained => major.x
- `~` => As long as same major and minor version are retained => major.minor.x
- Without anything, exact match till patch

## Package related information
- To find all installed packages and their dependencies - `npm list`
- To find only the installed packages - `npm list --depth=0`
- To find all related information of a package - `npm view packageName`
- To view only dependencies of a package - `npm view packageName dependecies`
- To view all version of a package - `npm run packageName versions`

## Upgrade/Downgrade a package
- Install a specific version of a package - `npm i packageName@m.m.p`
- Find outdated packages `npm outdated` or `npm -g outdated` for global. Does not return anything if nothing is outdated
- Update all packages (but only minor or patch) - `npm update`
- Update all packages including major versions
    - Need a different command line tool
    - `sudo npm i -g npm-check-updates`
    - To findout outdated packages including major versions - `npm-check-updates` or `ncu`
    - To upgrade package.json including major versions - `ncu -u` and then to install them `npm i`
- To install dependecies only for dev `npm i packageName --save-dev`
- Uninstall a package `npm uninstall packageName` or `npm un packageName` or `npm un -g packageName` for global
- Installing a global package `sudo npm i -g packageName`