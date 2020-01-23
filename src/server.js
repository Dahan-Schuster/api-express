const port = 3003

const express = require('express')
const app = express()

app.get('/products', (request, response) => {
    response.send(require('../files/products.json'))
})


app.listen(port, () => console.log(`Server running at port ${port}`))