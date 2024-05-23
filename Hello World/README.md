# Basics
- To check node version, `node --version` or `node -v`
- To run any js file, `node fileName.js`

## Export/Import modules
- To export as object
    - `module.exports.customName = attributeOrFunctionName`
- To export as function/attribute of a file
    - `module.exports = attributeOrFunctionName`
- To import a file and then function exported by another module
    - `const fileName = require('./filename')` for same folder
    - `const fileName = require('./folderName/filename')` for sub folder
    - `const fileName = require('../filename')` for parent folder
- To import a file directly
    - `const attributeOrFunctionName = require('./filename')`
- To execute the imported function 
    - `fileName.customName()`
    - `attributeOrFunctionName()`
- To import built in modules
    - `const module = require('moduleName')`

## Module Wrapper Function
- IIF - Immediately Invoked Function
    - `(function() { ... })`
- Module wrapper function
    - `(function(exports, require, module, __filename, __dirname) { ... } )`