const sequence = {
    _id: 1,

    get id() {
        return this._id++ 
    }
}

const produtos = {}

const salvarProduto = produto => {
    if (!produto.id) produto.id = sequence.id
    produtos[produto.id] = produto
    return produto
} 

const getProdutoById = id => produtos[id] || {}

const getProdutos = () => Object.values(produtos)

module.exports = { salvarProduto, getProdutoById, getProdutos }