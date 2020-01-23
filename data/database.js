const fs = require('fs') // imports the file system module
const scheduler = require('node-schedule') // scheduler to backup the database
const { exec } = require('child_process') // module for running shell/bash using node
const path = __dirname + '/products.json' // the path to the products json

let products

try {
    products = require('./products.json')
} catch (error) {
    products = { lastId: 0 }
}

/**
 * gives an ID and increment it, so the next ID will be ID + 1
 */
const sequence = {
    _id: products.lastId,

    get id() {
        return ++this._id
    }
}

/**
 * Save a product in the products object
 * and call the function that writes the
 * object in the json file
 * 
 * @param {object} product 
 */
const saveProduct = product => {
    if (!product.id) {
        product.id = sequence.id
        products.lastId = product.id
    }
    products[product.id] = product
    _writeProducts()
    return product
}

/**
 * Write all the products object in the json file
 */
function _writeProducts() {
    fs.writeFile(path, JSON.stringify(products), error => error ? console.log('Error:', error) : null)
}

/**
 * Returns an product from the products object
 * 
 * @param {number} id 
 */
const getProductById = id => products[id] || {}

/**
 * Returns an product from the products object
 * 
 * @param {number} id 
 */
const deleteProductById = id => {
    const product = getProductById(id)
    delete products[id]
    _writeProducts()
    return product
}

/**
 * Returns all the values from the products object
 */
const getProducts = () => Object.values(products)

scheduler.scheduleJob('* * * * *', function () {
    exec(
        'git pull origin master && git add data/products.json && git commit -m "Backuping database" && git push origin master',
        error => null
    )
})

module.exports = { saveProduct, getProductById, getProducts, deleteProductById }