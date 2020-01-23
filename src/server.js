const port = 3003
const database = require('../data/database')
const express = require('express')
const app = express()

app.get('/products', (request, response) => {
    response.send(database.getProducts())
})


app.listen(port, () => console.log(`Server running at port ${port}`))