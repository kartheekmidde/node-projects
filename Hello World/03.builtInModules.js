const path = require('path')
const os = require('os')
const fs = require('fs')
const EventEmitter = require('events')

console.log(`\n=================\n Path Module \n=================\n`);
let pathObj = path.parse(__filename)
console.log(pathObj)

console.log(`\n=================\n OS Module \n=================\n`);
let totalMem = os.totalmem()
let freeMem = os.freemem()

console.log(`Total memory is ${totalMem} and free memory is ${freeMem}`)

console.log(`\n=================\n File System Module \n=================\n`);

// // Synchronous
// const files = fs.readdirSync('./')
// console.log(files)

// Asynchronous
fs.readdir('./', function(err, files) {
    if (err)
        console.log('Error ', err);
    else 
        console.log(files)
})

console.log(`\n=================\n Events Module \n=================\n`);
const emitter = new EventEmitter();
emitter.on('messageLogged', (args) => console.log('Listener called ', args) );

emitter.emit('messageLogged', { id: 1, url: "test"});
