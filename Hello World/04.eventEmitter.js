const Logger = require('./logger3')

const logger = new Logger();

logger.on('messageLogged', (args) => console.log('Event is listened', args))
logger.log('Kartheek')