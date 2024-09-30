const Cart = require("../models/cart");
const Product = require("../models/product");
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Add a product to the cart or update its quantity
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [],
                totalPrice: 0
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId.toString());

        if (productIndex > -1) {
            cart.items[productIndex].quantity += quantity;
        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price
            });
        }

        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();
        cart = await cart.populate("items.productId");

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const productIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            cart.items.splice(productIndex, 1);

            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
            cart = await cart.populate("items.productId");

            res.status(200).json({
                success: true,
                message: "Product removed from cart",
                cart,
            });

        } else {
            res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Increment product quantity in the cart
const incrementQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const productIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            cart.items[productIndex].quantity += 1;

            cart.totalPrice = cart.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

            await cart.save();
            cart = await cart.populate("items.productId");

            res.status(200).json({
                success: true,
                message: "Product quantity incremented",
                cart,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Decrement product quantity in the cart
const decrementQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const productIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
            if (cart.items[productIndex].quantity > 1) {
                cart.items[productIndex].quantity -= 1;

                cart.totalPrice = cart.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );

                await cart.save();
                cart = await cart.populate("items.productId");

                res.status(200).json({
                    success: true,
                    message: "Product quantity decremented",
                    cart,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Cannot decrement quantity below 1",
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createCheckoutSession = async (req, res) => {
    const { items } = req.body;  

    const line_items = items.map(item => ({
        price_data: {
            currency: 'inr',  
            product_data: {
                name: item.productId.title,
                
            },
            unit_amount: Math.round(item.productId.price * 100),  
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.ORIGIN}/success`,  
            cancel_url: `${process.env.ORIGIN}/cancel`,   
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
}


// Get the cart for the current user
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.userId }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCart,
    createCheckoutSession
};

