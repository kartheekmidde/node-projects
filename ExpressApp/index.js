const express = require('express')
const app = express()
const Joi = require('joi')
const logger = require('./logger')
const helmet = require('helmet')
const morgan = require('morgan');

// To parse json objects add this middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())
app.use(morgan('tiny'))

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
app.listen(port, () => console.log(`Listening on port ${port}.............`))