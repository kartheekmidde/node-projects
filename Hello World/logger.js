
var url = 'http://mylogger.com/log'

function log(message) {
    // invoke log method api using url
    console.log("Exporting as object method ", message)
}

module.exports.logMethod = log;