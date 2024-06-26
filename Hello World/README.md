# Basics
- To check node version, `node --version` or `node -v`
- To run any js file, `node fileName.js`

## Export/Import modules

### ES6 (import/export)
- Export to make parts of a module to other modules
    - `export const myFunction = { ... }`
- Import to bring in modules
    - `import { myFunction } from './fileName.js'`
- Pros
    - Statically analyzed
    - Support asynchronous loading, which improves performance in web environments
    - Variables have their own scope
      
### CommonJS (require)
- Export using module.export
    - `module.exports.funcNameA = funcA`
- Import using require
    - `const logger = require('./fileName')`
    - `logger.funcNameA()`
- To export/import a single function in the file
    - `module.exports = funcA`
    - `const funcNameA = require('./fileName')`
    - `funcNameA()`
- To import a file from different paths
    - `const fileName = require('./filename')` for same folder
    - `const fileName = require('./folderName/filename')` for sub folder
    - `const fileName = require('../filename')` for parent folder
- To import built in modules (from ~node_modules)
    - `const module = require('moduleName')`

## Module Wrapper Function
- IIF - Immediately Invoked Function
    - `(function() { ... })`
- Module wrapper function
    - `(function(exports, require, module, __filename, __dirname) { ... } )`
