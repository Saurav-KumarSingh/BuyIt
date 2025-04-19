const express = require('express');
const Order = require('../models/Order');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();

// @route GET /api/admin/order
// @desc Get all orders (Admin only)
// @access Private/Admin

router.get("/",isLoggedIn,admin, async (req, res) => {
    try {
        const orders =await Order.find({}).populate("user","name email");
        res.status(201).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status (Admin only)
// @access Private/Admin

router.put("/:id",isLoggedIn,admin, async (req, res) => {
    try {
        let order =await Order.findById(req.params.id);

        if(order){
            order.status=req.body.status || order.status;
            order.isDelivered=req.body.status==="Delivered"?true:order.isDelivered;
            order.deliveredAt=req.body.status==="Delivered"?Date.now():order.deliveredAt;
            
            let updatedorder = await order.save();
            res.json({message:"orders updated successfully",updatedorder});
        }else{
            res.status(400).json({ message: "Order not found" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});
// @route DELETE /api/admin/orders/:id
// @desc Delete an order (Admin only)
// @access Private/Admin

router.delete("/:id",isLoggedIn,admin, async (req, res) => {
    try {
        let order =await Order.findById(req.params.id); 

        if(order){
            await order.deleteOne();
            res.json({message:"Order removed"});
        }else{
            res.status(400).json({ message: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });

    }
});



module.exports=router;