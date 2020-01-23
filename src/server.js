const port = 3003
const database = require('../data/database')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

/**
 * Midlleware function that will step in front of any request
 * in order to verify if an url-econded body has passed to the server
 * The bodyParser object is used to parse the request's body to an object
 * If the request comes with a body, then bodyParser will parse it and
 * then call the next() function, invoking the right middleware 
 * Confuse about next()? Read the next comment block :)
 */
app.use(bodyParser.urlencoded( { extended : true } ))

/**
 * Express is a library strongly based on middleware pattern
 * which means that we always receive a context object (request),
 * a response object and a next function
 * If we call next(), the next middleware function that responses
 * the same URL (GET /products, for example) will be called
 */
 app.get('/products', (req, res, next) => {
    console.log('Middleware #1 was passed!')
    next()
})

app.get('/products', (req, res, next) => {
    console.log('Middleware #2 was passed!')
    res.send(database.getProducts())
})

app.get('/products/:id', (req, res, next) => {
    res.send(database.getProductById(req.params.id))
}) 

app.post('/products', (req, res, next) => {
    res.send(
        database.saveProduct({
            name: req.body.name,
            price: req.body.price
        })
    )
})

app.put('/products/:id', (req, res, next) => {
    res.send(
        database.saveProduct({
            name: req.body.name,
            price: req.body.price,
            id: Number.parseInt(req.params.id)
        })
    )
})

app.listen(port, () => console.log(`Server running at port ${port}`))