const express = require("express");
const Product = require('../models/Product');
const Cart = require("../models/Cart");
const { isLoggedIn } = require('../middleware/authMiddleWare');

const router = express.Router();

// Helper function to get a cart by user Id or guest ID
const getCart = async (userId, guestId) => {
    if (userId) return await Cart.findOne({ user: userId });
    if (guestId) return await Cart.findOne({ guestId });
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    if (!productId || !quantity || !size || !color) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // Update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product entry
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0]?.url || '',
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart
            const newCart = await Cart.create({
                user: userId || undefined,
                guestId: guestId || "guest_" + Date.now(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0]?.url || '',
                    price: product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice: product.price * quantity,
            });

            return res.status(201).json(newCart);
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Server Error");
    }
});
// @route Put /api/cart
// @desc update product quantity in the cart
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;


    try {


        let cart = await getCart(userId, guestId);

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                // Update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.splice(productIndex, 1); //remove product, if quantity is zero
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);

        }
        else {
            res.status(404).json({ message: "Product not found in cart" });
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Server Error");
    }
});


// @route Put /api/cart
// @desc delete a product from the cart
// @access Public
router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;


    try {


        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {
                cart.products.splice(productIndex, 1); //remove product, if quantity is zero

                cart.totalPrice = cart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
            }
            await cart.save();
            return res.status(200).json(cart);

        }
        else {
            res.status(404).json({ message: "Product not found in cart" });
        }

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Server Error");
    }
});

// @route get /api/cart
// @desc get product from the cart
// @access Public

router.get("/", async (req, res) => {
    const clean = (val) => (val === "null" || val === "undefined") ? undefined : val;

    const userId = clean(req.query.userId);
    const guestId = clean(req.query.guestId);

    try {
        let cart = await getCart(userId, guestId);

        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Cart not found." });
        }

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("Server Error");
    }
});

// @route post /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private

router.post("/merge", isLoggedIn, async (req, res) => {
    const { guestId } = req.body;
    try {
        // find guest and user cart 
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ user: req.user._id });
        if (guestCart) {
            if (guestCart.products.length === 0) return res.status(400).json({ message: "Guest cart is empty" });

            // merge guestCart into user cart 

            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color);
                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;

                    } else {
                        userCart.products.push(guestItem);
                    }
                });
                // Recalculate total price
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                await userCart.save();

                // remove guestCart after merging
                try {
                    await Cart.findOneAndDelete({guestId});
                } catch (error) {
                    console.error("Error deleting the cart",error);
                }
                res.status(200).json(userCart);
            }else{
                // If user has no existing cart, assign the guest cart to user 
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"Guest cart not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
        

    }
})
module.exports = router;
