const sequence = {
    _id: 1,

    get id() {
        return this._id++ 
    }
}

const products = {}

const saveProduct = product => {
    if (!product.id) product.id = sequence.id
    products[product.id] = product
    return product
} 

const getProductById = id => products[id] || {}

const getProducts = () => Object.values(products)

module.exports = { saveProduct, getProductById, getProducts }