const express = require('express')
const app = express()
const logger = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan');
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const mysql = require('mysql')
const courses = require('./routes/courses')

// To parse json objects add this middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())

app.use('/api/courses', courses)

console.log('Application name ' + config.get('name'))
console.log('Mail server ' + config.get('mail.host'))
console.log('Mail server ' + config.get('mail.password'))

// console.log(`NODE_ENV ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get('env')}`) // returns development by default if NODE_ENV is not set
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled')
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    const connection = mysql.createConnection({
        host: config.get('db.host'),
        user: config.get('db.username'),
        password: config.get('db.password'),
        port: config.get('db.port')
    })

    connection.connect((err) => {
        if (err) {
            console.log('Unable to connect to database ' + err)
        }
        console.log('Connected as id ' + connection.threadId);
        // DB related debugging
        dbDebugger('Connected to DB..')
    })

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) 
            throw err
        console.log('The solution is: ', rows[0].solution)
    })
      
    connection.end()
    console.log(`Listening on port ${port}.............`)
})