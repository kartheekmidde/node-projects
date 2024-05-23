const express = require('express')
const app = express()
const Joi = require('joi')

app.use(express.json())

const port = process.env.PORT | 3000
const genres = [
    { id: 1, name: "action"}, 
    { id: 2, name: "thriller"}, 
    { id: 3, name: "drama"}
]

app.get('/', (req, res) => {
    res.send('OK')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre)
        return res.status(404).send('The genre with given id is not found')
    res.send(genre)
})

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre)
    return res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre)
        return res.status(404).send('The genre with given id is not found')

    const { error } = validateGenre(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    genre.name = req.body.name
    res.send(genre)

})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(gen => gen.id === parseInt(req.params.id))
    if (!genre)
        return res.status(404).send('The genre with given id is not found')

    const index = genres.indexOf(genre)
    genres.splice(index, 1)

    return res.send(genre)
})

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

app.listen(port, () => console.log(`Listening to port ${port}...`))