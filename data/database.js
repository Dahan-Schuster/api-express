const fs = require('fs') // imports the file system module
const path = __dirname + '/products.json' // the path to the products json

let products = require('./products.json')

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
    fs.writeFile(path, JSON.stringify(products), error => console.log('Error:', error))
}

/**
 * Returns an product from the products object
 * 
 * @param {number} id 
 */
const getProductById = id => products[id] || {}

/**
 * Returns all the values from the products object
 */
const getProducts = () => Object.values(products)

module.exports = { saveProduct, getProductById, getProducts }