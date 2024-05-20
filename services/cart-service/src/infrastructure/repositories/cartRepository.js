const CartModel = require('../database/models/CartModel')


const getCartByUserId = async (userId) => {
    return CartModel.findOne({ userId });
};

const saveCart = async (cart) => {
    const existingCart = await CartModel.findOne({ userId: cart.userId });
    if (existingCart) {
        existingCart.items = cart.items;
        return existingCart.save();
    }
    return new CartModel(cart).save();
};

module.exports = {
    getCartByUserId,
    saveCart,
};