const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World')
        res.end()
    }

    if (req.url === '/jobs') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})

// Old style and low level
// server.on('connection', (socket) => console.log('New connection'))

server.listen(3000)

console.log('Listening to port 3000')