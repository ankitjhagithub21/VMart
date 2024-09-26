const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { addToCart, removeFromCart, getCart, incrementQuantity, decrementQuantity } = require('../controllers/cartController');
const cartRouter = express.Router();

cartRouter.post("/add", isAuthenticated, addToCart);
cartRouter.delete("/remove", isAuthenticated, removeFromCart);
cartRouter.post("/increment", isAuthenticated, incrementQuantity);
cartRouter.post("/decrement", isAuthenticated, decrementQuantity);
cartRouter.get("/", isAuthenticated, getCart);

module.exports = cartRouter;
