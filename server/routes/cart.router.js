const express = require('express');

const cartRouter = express.Router();
const { addToCartController } = require('../controllers/cart.controller');

cartRouter.get('/', (req, res) => {
    const cart = req.session.cart || {};
    return res.status(200).json({ cart: cart });
});

cartRouter.post('/add', (req, res) => {
    try {
        addToCartController(req, res);
        res.status(200).json({ message: "Succesfully added to cart", cart: req.session.cart })
    } catch (error) {
        console.error("unable to add to cart", error);
        res.status(400).json({ message: "Unable to add to cart" })
    }
});

cartRouter.post('/empty', (req, res) => {
    try {
        req.session.cart = {};
        res.status(200).json({ message: "cart emptied", cart: req.session.cart });
    } catch (error) {
        console.error("Unable to empty cart");
    }
})


module.exports = cartRouter;