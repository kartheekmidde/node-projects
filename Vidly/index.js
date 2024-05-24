const express = require('express')
const app = express()
const genres = require('./routes/genres')

app.use(express.json())
app.use('/api/genres', genres)

const port = process.env.PORT | 3000

app.get('/', (req, res) => {
    res.send('OK')
})

app.listen(port, () => console.log(`Listening to port ${port}...`))