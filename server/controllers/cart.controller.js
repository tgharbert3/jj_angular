function addToCartController(req, res) {

    const { image_id, quantity, caption, price } = req.body;

    if (!req.session.cart) {
        req.session.cart = {};
    }

    if (req.session.cart[image_id]) {
        req.session.cart[image_id].quantity += quantity
        return
    } else {
        req.session.cart[image_id] = {
            quantity: quantity,
            caption: caption,
            price: price
        };
        return
    }
};

module.exports = {
    addToCartController,
}