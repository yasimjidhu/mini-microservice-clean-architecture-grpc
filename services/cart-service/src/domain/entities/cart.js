const createCart = (userId,items = [])=>({
    userId,
    items
})

module.exports = {createCart}