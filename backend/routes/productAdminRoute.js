const express = require('express');
const Product = require('../models/Product');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin

router.get("/",isLoggedIn,admin, async (req, res) => {
    try {
        const products =await Product.find({});
        res.status(201).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});


module.exports=router;
