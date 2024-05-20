const { createCartItem} = require('../../domain/entities/cartItem');

const AddToCart = async (cartRepository, userId, productId) => {
    let cart = await cartRepository.getCartByUserId(userId);
    if (!cart) {
        cart = { userId, items: [createCartItem(productId, 1)] };
        await cartRepository.saveCart(cart);
        return 'Item added to cart';
    }

    const item = cart.items.find(i => i.productId === productId);
    if (item) {
        item.quantity += 1;
    } else {
        cart.items.push(createCartItem(productId, 1));
    }

    await cartRepository.saveCart(cart);
    return 'Item added to cart';
};

const RemoveFromCart = async (cartRepository, userId, productId) => {
    const cart = await cartRepository.getCartByUserId(userId);
    if (!cart) return 'Cart not found';

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return 'Item not found in cart';

    cart.items.splice(itemIndex, 1);
    await cartRepository.saveCart(cart);
    return 'Item removed from cart';
};

const GetUserCartProducts = async (cartRepository, userId) => {
    const cart = await cartRepository.getCartByUserId(userId);
    return cart || { userId, items: [] };
};

module.exports = {
    AddToCart,
    RemoveFromCart,
    GetUserCartProducts,
};
