const express = require('express');
const Order = require('../models/Order');
const {isLoggedIn,admin} = require('../middleware/authMiddleWare');
const router = express.Router();

// @route GET /api/admin/order
// @desc Get all orders (Admin only)
// @access Private/Admin

router.get("/", isLoggedIn, admin, async (req, res) => {
    try {
        // Fetch all orders, populate the user field with name and email
        const orders = await Order.find({})
            .populate("user", "name email");

        // Send response with the orders and a 200 status code
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        // Send error message with a 500 status code in case of failure
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/:id", isLoggedIn, admin, async (req, res) => {
    try {
      let order = await Order.findById(req.params.id);
  
      if (order) {
        order.status = req.body.status || order.status;
        order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
        order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
  
        await order.save();
  
        // Populate the user field before returning
        const updatedOrder = await Order.findById(order._id).populate("user", "name");
  
        res.json(updatedOrder);
      } else {
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