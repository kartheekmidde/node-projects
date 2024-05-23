const EventEmitter = require('events')

class Logger extends EventEmitter {
    log(message) {
        console.log(message)
        
        this.emit('messageLogged', { data: 'test' })
    }
}

module.exports = Logger