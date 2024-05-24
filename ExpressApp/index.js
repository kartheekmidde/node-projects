const express = require('express')
const app = express()
const Joi = require('joi')
const logger = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan');
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const mysql = require('mysql')

// To parse json objects add this middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())


console.log('Application name ' + config.get('name'))
console.log('Mail server ' + config.get('mail.host'))
console.log('Mail server ' + config.get('mail.password'))

// console.log(`NODE_ENV ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get('env')}`) // returns development by default if NODE_ENV is not set
if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled')
}

// DB related debugging
dbDebugger('Connected to DB..')

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    // Find and throw error if not found
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course)
        return res.status(404).send("The course with given id is not found")
    res.send(course)
    // Route parameters
    // res.send(req.params.id)

    // Query parameters
    // res.send(req.query.id)
})

app.post('/api/courses/', (req, res) => {
    // Validate and throw error if not valid
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        // Body parameters
        name: req.body.name
    }

    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    // Find and throw error if not found
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course)
        return res.status(404).send("The course with given id is not found")

    // Validate and throw error if not valid
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    // Update the course
    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
// Find and throw error if not found
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course)
        return res.status(404).send("The course with given id is not found")

    const index = courses.indexOf(course)
    courses.splice(index, 1);

    res.send(course)
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(course)
}

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
    })

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) 
            throw err
        console.log('The solution is: ', rows[0].solution)
    })
      
    connection.end()
    console.log(`Listening on port ${port}.............`)
})