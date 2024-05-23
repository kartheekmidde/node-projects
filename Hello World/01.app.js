console.log(`\n=================\n Global Objects \n=================\n`);
console.log('Hello World');

// to execute a function after a specified delay (in milliseconds).
const startTime = Date.now();
const timeoutId = setTimeout(() => console.log('Implementing set timeout ' + (Date.now() - startTime)), 2000)

// to cancel a timeout that was previously set with setTimeout.
setTimeout(() => {
    clearTimeout(timeoutId);
    console.log('Implementing clear timeout ' + (Date.now() - startTime));
}, 5000);

// to repeatedly execute a function at a specified interval (in milliseconds)
const intervalId = setInterval(() => console.log('Implementing set interval ' + (Date.now() - startTime)), 3000)

// to cancel an interval that was previously set with setInterval.
setTimeout( () => { 
    clearInterval(intervalId); 
    console.log('Implementing clear interval ' + (Date.now() - startTime));
}, 8000);

var message = 'test message'
// console.log(global.message) // will throw undefined

// Module Scope
console.log(`\n=================\nModule Scope\n=================\n`);
console.log('Hello World');
console.log(module);