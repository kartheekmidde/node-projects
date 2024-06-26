const express = require('express')
const router = express.Router();
const Joi = require('joi')

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

router.get('/', (req, res) => {
    res.send(courses)
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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


module.exports = router