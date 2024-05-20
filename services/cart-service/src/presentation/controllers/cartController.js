const { AddToCart, RemoveFromCart, GetUserCartProducts } = require('../../application/use_cases/cartUseCases');
const { getCartByUserId, saveCart } = require('../../infrastructure/repositories/cartRepository');

const addToCartHandler = async (call, callback) => {
    const { userId, productId } = call.request;
    const message = await AddToCart({ getCartByUserId, saveCart }, userId, productId);
    callback(null, { message });
};

const removeFromCartHandler = async (call, callback) => {
    const { userId, productId } = call.request;
    const message = await RemoveFromCart({ getCartByUserId, saveCart }, userId, productId);
    callback(null, { message });
};

const getUserCartProductsHandler = async (call, callback) => {
    const { userId } = call.request;
    const cart = await GetUserCartProducts({ getCartByUserId, saveCart }, userId);
    const items = cart.items.map(item => ({ productId: item.productId, quantity: item.quantity }));
    callback(null, { userId: cart.userId, items });
};

module.exports = {
    addToCartHandler,
    removeFromCartHandler,
    getUserCartProductsHandler,
};
